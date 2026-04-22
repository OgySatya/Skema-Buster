<script setup lang="ts">
import type { InputMenuItem } from "@nuxt/ui";
import type { FormError, FormErrorEvent, FormSubmitEvent } from "@nuxt/ui";
import { type User } from "~/types/user";
const emit = defineEmits(["success"]);
const state = reactive<User>({
  name: "",
  nip: "",
  group: "",
  mulai: 6,
  password: "",
  status: false,
});

type Schema = typeof state;

function validate(state: Partial<Schema>): FormError[] {
  const errors = [];
  if (!state.name) errors.push({ name: "name", message: "Required" });
  if (!state.nip) errors.push({ name: "nip", message: "Required" });
  if (!state.group) errors.push({ name: "group", message: "Required" });
  if (!state.password) errors.push({ name: "password", message: "Required" });
  return errors;
}

const toast = useToast();
const loading = ref(false);
async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true;
  toast.add({
    title: "Success",
    description: "Pasukan berhasil ditambahkan",
    color: "success",
  });
  await $fetch("/api/user-json", {
    method: "POST",
    body: {
      name: state.name,
      nip: state.nip,
      group: state.group,
      mulai: state.mulai,
      password: state.password,
      status: state.status,
    },
  });
  emit("success");
  loading.value = false;
  await refreshNuxtData("user-list");
}

async function onError(event: FormErrorEvent) {
  if (event?.errors?.[0]?.id) {
    const element = document.getElementById(event.errors[0].id);
    element?.focus();
    element?.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

const group = ref<InputMenuItem[]>([
  { label: "Admin", id: "admin" },
  { label: "Regu A", id: "a" },
  { label: "Regu B", id: "b" },
  { label: "Regu C", id: "c" },
]);
const awal = ref<InputMenuItem[]>([
  { label: "Pagi Pertama", id: 1 },
  { label: "Pagi Kedua", id: 2 },
  { label: "Malam Pertama", id: 3 },
  { label: "Malam Kedua", id: 4 },
  { label: "Lepas Jaga", id: 5 },
  { label: "Libur", id: 0 },
  { label: "Admin", id: 6 },
]);
</script>

<template>
  <UForm
    :validate="validate"
    :state="state"
    class="space-y-4 w-2/3 mx-auto"
    @submit="onSubmit"
    @error="onError"
  >
    <UFormField label="Name" name="name">
      <UInput v-model="state.name" />
    </UFormField>

    <UFormField label="NIP" name="nip">
      <UInput v-model="state.nip" />
    </UFormField>

    <UFormField label="Group" name="group">
      <UInputMenu
        v-model="state.group"
        :items="group"
        value-key="id"
        placeholder="Pilih group"
      />
    </UFormField>

    <UFormField label="Awal Masuk" name="mulai">
      <UInputMenu
        v-model="state.mulai"
        :items="awal"
        value-key="id"
        placeholder="Awal Tahun Masuk"
      />
    </UFormField>

    <UFormField label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormField>

    <UButton
      type="submit"
      variant="soft"
      class="mx-auto"
      :loading="loading"
      loading-icon="i-lucide-loader"
    >
      Tambah Pasukan
    </UButton>
  </UForm>
</template>
