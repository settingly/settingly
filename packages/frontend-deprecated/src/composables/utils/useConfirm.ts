import { ref } from 'vue';

const isOpen = ref(false);
const title = ref('');
const message = ref('');
let resolvePromise: (value: boolean) => void;

export function useConfirm() {
  /**
   * Opens the dialog and returns a Promise that resolves
   * with true (Confirm) or false (Cancel).
   */
  function confirmDialog(msg: string, dialogTitle = 'Confirmation Required'): Promise<boolean> {
    title.value = dialogTitle;
    message.value = msg;
    isOpen.value = true;
    return new Promise<boolean>((resolve) => {
      resolvePromise = resolve;
    });
  }

  /**
   * Closes the dialog and resolves the Promise with true.
   */
  function handleConfirm() {
    isOpen.value = false;
    resolvePromise(true);
  }

  /**
   * Closes the dialog and resolves the Promise with false.
   */
  function handleCancel() {
    isOpen.value = false;
    resolvePromise(false);
  }

  return {
    isOpen,
    title,
    message,
    confirmDialog,
    handleConfirm,
    handleCancel,
  };
}
