<!-- <script setup lang="ts">
// import { useModal } from "@/composable/useModal";
const { isOpen, modalData, close } = useModal();
</script>
<template>
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <!-- Overlay -->
      <div
        class="absolute inset-0 bg-black/50 backdrop-blur-sm"
        @click="close"
      />

      <!-- Modal -->
      <Transition name="scale">
        <div
          class="relative z-10 w-full max-w-lg mx-4 bg-white rounded-2xl shadow-xl p-6"
        >
          <!-- Header -->
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold">
              {{ modalData?.title || "Modal" }}
            </h2>

            <button
              @click="close"
              class="text-gray-400 hover:text-gray-600 transition"
            >
              ✕
            </button>
          </div>

          <!-- Content -->
          <div class="text-gray-700">
            <slot :data="modalData">
              {{ modalData?.message }}
            </slot>
          </div>

          <!-- Footer -->
          <div class="mt-6 flex justify-end gap-2">
            <button
              @click="close"
              class="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
            >
              Cancel
            </button>

            <button
              v-if="modalData?.onConfirm"
              @click="
                modalData.onConfirm();
                close();
              "
              class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Confirm
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
/* Fade backdrop */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Scale modal */
.scale-enter-active,
.scale-leave-active {
  transition: all 0.2s ease;
}
.scale-enter-from {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}
.scale-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}
</style> -->
