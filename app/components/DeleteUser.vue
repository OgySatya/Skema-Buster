<script setup>
function batal() {
  emit("success");
}
const props = defineProps({
  id: String,
});
const emit = defineEmits(["success"]);
const loading = ref(false);
const deleteUser = async () => {
  loading.value = true;
  try {
    await $fetch("/api/user-json", {
      method: "DELETE",
      body: {
        nip: props.id,
      },
    });
  } finally {
    loading.value = false;
    await refreshNuxtData("user-list");
    emit("success");
  }
};
</script>

<template>
  <div class="flex gap-3 mx-auto justify-between">
    <UButton color="error" @click="deleteUser" :loading="loading"
      >Hapus</UButton
    >
    <UButton color="info" @click="batal">Batal</UButton>
  </div>
</template>
