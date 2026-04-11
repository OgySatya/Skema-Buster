<script setup lang="ts">
import { useGithubJson } from "~/composable/Github";
import { useModal } from "~/composable/useModal";
const { deactivateAll } = useGithubJson();
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
