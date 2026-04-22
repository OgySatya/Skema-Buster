<script setup lang="ts">
import type { InputMenuItem } from "@nuxt/ui";
import { type Response } from "~/types/github";
const emit = defineEmits(["success"]);
const { data: response } = await useFetch<Response>("/api/user-json", {
  key: "user-list",
});

const users = computed(() => response.value?.data || []);

const groupA = ref(users.value.filter((u: any) => u.group === "a")[0]?.mulai);
const groupB = ref(users.value.filter((u: any) => u.group === "b")[0]?.mulai);
const groupC = ref(users.value.filter((u: any) => u.group === "c")[0]?.mulai);

const awal = ref<InputMenuItem[]>([
  { label: "Pagi Pertama", id: 1 },
  { label: "Pagi Kedua", id: 2 },
  { label: "Malam Pertama", id: 3 },
  { label: "Malam Kedua", id: 4 },
  { label: "Lepas Jaga", id: 5 },
  { label: "Libur", id: 0 },
  { label: "Admin", id: 6 },
]);
const loading = ref(false);
const updateJadwal = async () => {
  loading.value = true;
  await $fetch("/api/user-json", {
    method: "PATCH",
    body: {
      action: "batch-update-mulai",
      updates: [
        { group: "a", mulai: groupA.value },
        { group: "b", mulai: groupB.value },
        { group: "c", mulai: groupC.value },
      ],
    },
  });

  await refreshNuxtData("user-list");

  emit("success");
  loading.value = false;
};
const year = new Date().getFullYear();
</script>

<template>
  <UAlert
    class="font-bold"
    color="info"
    variant="subtle"
    title="Penting BOSS!"
    :description="`Sesuaikan Jadwal Mulai Kerja Tiap Regu di Awal Tahun pada Tanggal 01-Januari-${year}`"
  />

  <UForm class="space-y-4 w-10/12 mx-auto" @submit="updateJadwal">
    <UFormField label="Regu A" name="email">
      <UInputMenu v-model="groupA" value-key="id" :items="awal" />
    </UFormField>

    <UFormField label="Regu B" name="password">
      <UInputMenu v-model="groupB" value-key="id" :items="awal" />
    </UFormField>

    <UFormField label="Regu C" name="password">
      <UInputMenu v-model="groupC" value-key="id" :items="awal" />
    </UFormField>
    <div class="flex justify-between">
      <UButton
        type="submit"
        color="info"
        :loading="loading"
        loading-icon="i-lucide-loader"
      >
        Ganti Jadwal
      </UButton>
    </div>
  </UForm>
</template>
