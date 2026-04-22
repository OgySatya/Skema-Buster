<script setup>
defineProps({
  isOpen: Boolean,
  title: String,
});
const emit = defineEmits(["close"]);
</script>

<template>
  <Transition
    enter-active-class="duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        class="fixed inset-0 bg-gray-900/70 backdrop-blur-sm"
        @click="emit('close')"
      ></div>

      <UPageCard class="relative w-full max-w-sm mx-auto" variant="subtle">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold">{{ title }}</h2>
          <button
            @click="emit('close')"
            class="text-gray-400 hover:text-gray-600"
          >
            <span class="sr-only">Close</span>
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <slot />
      </UPageCard>
    </div>
  </Transition>
</template>
