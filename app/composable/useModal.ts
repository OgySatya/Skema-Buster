import { ref } from "vue";

const isOpen = ref(false);
const modalData = ref<any>(null);

export function useModal() {
  function open(data: any = null) {
    modalData.value = data;
    isOpen.value = true;
  }

  function close() {
    isOpen.value = false;
    modalData.value = null;
  }

  return {
    isOpen,
    modalData,
    open,
    close,
  };
}
