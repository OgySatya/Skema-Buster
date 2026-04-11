<script setup lang="ts">
import { useGithubJson } from "@/composable/Github";
const {
  list,
  loading,
  running,
  createUser,
  updateUserStatus,
  deleteUser,
  loadData,
} = useGithubJson();
// Load initial data
onMounted(() => loadData());
const isSwitch = ref(false);
console.log(list.value);
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
      <div v-for="user in list" :key="user.nip" class="flex justify-between">
        <UUser
          :class="user.status ? '' : 'line-through'"
          :name="user.name"
          :description="`NIP: ${user.nip}`"
        />
        <div class="flex items-center gap-2">
          <UButton
            @click="updateUserStatus(user.id, !user.status)"
            variant="soft"
            :loading="running === user.id"
            :color="user.status ? 'success' : 'warning'"
            >{{ user.status ? "Melu" : "Off" }}</UButton
          >
          <UButton
            @click="deleteUser(user.id)"
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
      <div v-for="user in list" :key="user.nip" class="flex justify-between">
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
      <div v-for="user in list" :key="user.nip" class="flex justify-between">
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
      <div v-for="user in list" :key="user.nip" class="flex justify-between">
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
