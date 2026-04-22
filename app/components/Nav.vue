<script setup lang="ts">
import { type Response } from "~/types/github";

const deactivateAll = async () => {
  await $fetch("/api/user-json", {
    method: "PATCH",
    body: {
      action: "tiarap",
    },
  });
};
const isModalOpen = ref(false);
const groupModal = ref(false);

const handleUserCreated = () => {
  isModalOpen.value = false;
};
</script>
<template>
  <UHeader>
    <template #left class="">
      <NuxtLink to="/">
        <AppLogo class="w-auto h-6 shrink-0 hidden md:flex" />
      </NuxtLink>
    </template>

    <template #right>
      <UButton
        @click="isModalOpen = true"
        icon="i-lucide-plus"
        size="md"
        color="success"
        variant="soft"
      >
        Pasukan</UButton
      >
      <UButton
        @click="deactivateAll()"
        icon="i-lucide-siren"
        size="md"
        color="warning"
        variant="soft"
      >
        Tiarap</UButton
      >
      <UButton
        @click="groupModal = true"
        icon="i-lucide-calendar"
        size="md"
        variant="soft"
        color="neutral"
      >
        Jadwal</UButton
      >
      <UColorModeButton />
    </template>
  </UHeader>
  <div>
    <AppModal
      :is-open="isModalOpen"
      title="Tambah Pasukan Kates Entah"
      @close="isModalOpen = false"
    >
      <CreateUser @success="handleUserCreated" />
    </AppModal>
  </div>
  <div>
    <AppModal
      :is-open="groupModal"
      title="Atur Jadwal Shift Regu"
      @close="groupModal = false"
    >
      <GroupSetting @success="groupModal = false" />
    </AppModal>
  </div>
</template>
