<script setup lang="ts">
import { type Response } from "~/types/github";
const { data: response } = await useFetch<Response>("/api/user-json");

const users = computed(() => response.value?.data || []);
const isSwitch = ref(false);

const running = ref<number | null>(null);

const updateUserStatus = async (nip: number, newStatus: boolean) => {
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
  } catch (err) {
    // ❗ rollback if failed
    const user = users.value.find((u) => u.nip === nip);
    if (user) user.status = !newStatus;
  } finally {
    running.value = null;
  }
};
const deleteUser = async (nip: number) => {
  await $fetch("/api/user-json", {
    method: "DELETE",
    body: {
      nip: nip,
    },
  });
};
</script>
<template>
  <UPageGrid class="lg:grid-cols-4">
    <UPageCard
      class="border-2 border-primary"
      title="SHIFT PAGI"
      description="REGU A"
      orientation="vertical"
      variant="soft"
    >
      <USeparator color="primary" type="solid" />
      <div v-for="user in users" :key="user.nip" class="flex justify-between">
        <UUser
          :class="user.status ? '' : 'line-through'"
          :name="user.name"
          :description="`NIP: ${user.nip}`"
        />
        <div class="flex items-center gap-2">
          <UButton
            @click="updateUserStatus(user.nip, !user.status)"
            variant="soft"
            :loading="running === user.nip"
            :color="user.status ? 'success' : 'warning'"
            >{{ user.status ? "Melu" : "Off" }}</UButton
          >
          <UButton
            @click="deleteUser(user.nip)"
            icon="i-lucide-x"
            size="md"
            color="error"
            variant="subtle"
          />
        </div>
      </div>
    </UPageCard>
    <UPageCard
      class="border-2 border-primary"
      title="SHIFT PAGI"
      description="REGU A"
      orientation="vertical"
      variant="soft"
    >
      <USeparator color="primary" type="solid" />
      <div v-for="user in users" :key="user.nip" class="flex justify-between">
        <UUser :name="user.name" :description="`NIP: ${user.nip}`" />
        <div class="flex items-center gap-2">
          <USwitch v-model="isSwitch" />
          <UButton
            icon="i-lucide-delete"
            size="sm"
            color="error"
            variant="subtle"
          />
        </div>
      </div> </UPageCard
    ><UPageCard
      class="border-2 border-primary"
      title="SHIFT PAGI"
      description="REGU A"
      orientation="vertical"
      variant="soft"
    >
      <USeparator color="primary" type="solid" />
      <div v-for="user in users" :key="user.nip" class="flex justify-between">
        <UUser :name="user.name" :description="`NIP: ${user.nip}`" />
        <div class="flex items-center gap-2">
          <USwitch v-model="isSwitch" />
          <UButton
            icon="i-lucide-delete"
            size="sm"
            color="error"
            variant="subtle"
          />
        </div>
      </div> </UPageCard
    ><UPageCard
      class="border-2 border-primary"
      title="SHIFT PAGI"
      description="REGU A"
      orientation="vertical"
      variant="soft"
    >
      <USeparator color="primary" type="solid" />
      <div v-for="user in users" :key="user.nip" class="flex justify-between">
        <UUser :name="user.name" :description="`NIP: ${user.nip}`" />
        <div class="flex items-center gap-2">
          <USwitch v-model="isSwitch" />
          <UButton
            icon="i-lucide-delete"
            size="sm"
            color="error"
            variant="subtle"
          />
        </div>
      </div>
    </UPageCard>
  </UPageGrid>
</template>
