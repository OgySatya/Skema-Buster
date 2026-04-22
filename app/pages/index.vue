<script setup lang="ts">
import Users from "../components/Users.vue";

const today = new Date();
const startOfYear = new Date(today.getFullYear(), 0, 0);
const dayOfYear = Math.floor(
  (today.getTime() - startOfYear.getTime()) / 86400000,
);
const interval = dayOfYear % 6;
</script>

<template>
  <Nav />
  <StarBg />

  <div class="mb-8 mx-auto w-full">
    <h1 class="text-3xl font-bold text-center mt-8 font-serif">
      Pasukan Khusus Seloaji
      <span class="text-primary font-thin">Kates Entah</span>
    </h1>
    <p class="text-center mt-4 text-gray-600">
      {{
        today.toLocaleDateString("id-ID", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      }}
      / Hari ke-{{ dayOfYear }} - {{ [interval] }}
    </p>
  </div>
  <Users class="mx-8 my-4" />
</template>
