<script setup lang="ts">
import { type Response } from "~/types/github";
import { useShift } from "~/composable/useShift";

const shift = await useShift();

// destructure (optional)
const { shift1, shift2a, shift2b, libur1, libur2, admin } = shift;
const { data: response } = await useFetch<Response>("/api/user-json", {
  key: "user-list",
});

const users = computed(() => response.value?.data || []);

const running = ref<string | null>(null);

const updateUserStatus = async (nip: string, newStatus: boolean) => {
  try {
    running.value = nip;

    // ⚡ optimistic update
    const user = users.value.find((u) => u.nip === nip);
    if (user) user.status = newStatus;

    await $fetch("/api/user-json", {
      method: "PUT",
      body: {
        nip,
        status: newStatus,
      },
    });
  } finally {
    await refreshNuxtData("user-list");
    running.value = null;
  }
};

const isModalOpen = ref(false);
const hapus = ref<string>("");
const userId = ref<string>("");

function deleteModal(name: string, id: string) {
  isModalOpen.value = true;
  hapus.value = name;
  userId.value = id;
}

const userDeleted = () => {
  isModalOpen.value = false;
  hapus.value = "";
  userId.value = "";
};
</script>
<template>
  <UPageGrid class="lg:grid-cols-4 mx-auto">
    <UPageCard
      class="border-2 border-primary uppercase items-start"
      title="SHIFT PAGI"
      :description="`REGU ${shift1[0]?.group}`"
      orientation="vertical"
      variant="soft"
    >
      <USeparator color="primary" type="solid" />
      <div v-for="user in shift1" :key="user.nip" class="flex justify-between">
        <UUser
          :class="user.status ? '' : 'line-through'"
          :name="user.name"
          :description="`NIP: ${user.nip}`"
        />
        <div class="flex items-center gap-2">
          <USwitch
            size="xl"
            :loading="running === user.nip"
            loading-icon="i-lucide-loader"
            @click="updateUserStatus(user.nip, !user.status)"
            v-model="user.status"
          />
          <UButton
            icon="i-lucide-x"
            size="md"
            color="error"
            variant="solid"
            @click="deleteModal(user.name, user.nip)"
          />
        </div>
      </div>
    </UPageCard>
    <UPageCard
      class="border-2 border-info uppercase items-start"
      title="SHIFT MALAM"
      :description="`REGU ${shift2a[0]?.group || shift2b[0]?.group}`"
      orientation="vertical"
      variant="soft"
    >
      <USeparator color="info" type="solid" />
      <div
        v-for="user in shift2a.concat(shift2b)"
        :key="user.nip"
        class="flex justify-between"
      >
        <UUser
          :name="user.name"
          :description="`NIP: ${user.nip}`"
          :class="user.status ? '' : 'line-through'"
        />
        <div class="flex items-center gap-2">
          <USwitch
            size="xl"
            :loading="running === user.nip"
            loading-icon="i-lucide-loader"
            @click="updateUserStatus(user.nip, !user.status)"
            v-model="user.status"
          />
          <UButton
            icon="i-lucide-x"
            size="md"
            color="error"
            variant="solid"
            @click="deleteModal(user.name, user.nip)"
          />
        </div>
      </div> </UPageCard
    ><UPageCard
      class="border-2 border-warning uppercase items-start"
      title="LIBUR SANTAI"
      :description="`REGU ${libur1[0]?.group || libur2[0]?.group}`"
      orientation="vertical"
      variant="soft"
    >
      <USeparator color="warning" />
      <div
        v-for="user in libur1.concat(libur2)"
        :key="user.nip"
        class="flex justify-between"
      >
        <UUser
          :class="user.status ? '' : 'line-through'"
          :name="user.name"
          :description="`NIP: ${user.nip}`"
        />
        <div class="flex items-center gap-2">
          <USwitch
            size="xl"
            :loading="running === user.nip"
            loading-icon="i-lucide-loader"
            @click="updateUserStatus(user.nip, !user.status)"
            v-model="user.status"
          />
          <UButton
            icon="i-lucide-x"
            size="md"
            color="error"
            variant="solid"
            @click="deleteModal(user.name, user.nip)"
          />
        </div>
      </div> </UPageCard
    ><UPageCard
      class="border-2 border-error items-start uppercase"
      title="ADMINISTRASI"
      description="ADMIN"
      orientation="vertical"
      variant="soft"
    >
      <USeparator color="error" type="solid" />
      <div v-for="user in admin" :key="user.nip" class="flex justify-between">
        <UUser
          :class="user.status ? '' : 'line-through'"
          :name="user.name"
          :description="`NIP: ${user.nip}`"
        />
        <div class="flex items-center gap-2">
          <USwitch
            size="xl"
            :loading="running === user.nip"
            loading-icon="i-lucide-loader"
            @click="updateUserStatus(user.nip, !user.status)"
            v-model="user.status"
          />
          <UButton
            icon="i-lucide-x"
            size="md"
            color="error"
            variant="solid"
            @click="deleteModal(user.name, user.nip)"
          />
        </div>
      </div>
    </UPageCard>
  </UPageGrid>
  <div>
    <AppModal
      :is-open="isModalOpen"
      :title="`Yakin Hapus ${hapus} ???`"
      @close="isModalOpen = false"
    >
      <DeleteUser @success="userDeleted" :id="userId" />
    </AppModal>
  </div>
</template>
