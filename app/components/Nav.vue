<script setup lang="ts">
import { useModal } from "~/composable/useModal";
import { type Response } from "~/types/github";
const { data: response } = await useFetch<Response>("/api/user-json");

const users = ref(response.value?.data || []);

const deactivateAll = async () => {
  users.value = users.value.map((u) => ({
    ...u,
    status: false,
  }));

  await $fetch("/api/user-json", {
    method: "PATCH",
  });
};
const { open } = useModal();

function openModal() {
  open({
    title: "Delete Item",
    message: "Are you sure you want to delete this?",
    onConfirm: () => {
      console.log("Deleted!");
    },
  });
}
</script>
<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/">
        <AppLogo class="w-auto h-6 shrink-0" />
      </NuxtLink>
    </template>

    <template #right>
      <UButton
        @click="openModal()"
        icon="i-lucide-trash-2"
        size="md"
        color="error"
        variant="soft"
      >
        Bersihkan</UButton
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
      <UColorModeButton />
    </template>
  </UHeader>
</template>
