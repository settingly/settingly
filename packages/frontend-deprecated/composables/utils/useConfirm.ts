const isOpen = ref(false);
const title = ref("");
const message = ref("");
let resolvePromise: (value: boolean) => void;

export function useConfirm() {
  /**
   * Öffnet den Dialog und gibt ein Promise zurück,
   * das mit true (Confirm) oder false (Cancel) aufgelöst wird.
   */
  function confirmDialog(
    msg: string,
    dialogTitle = "Confirmation Required"
  ): Promise<boolean> {
    title.value = dialogTitle;
    message.value = msg;
    isOpen.value = true;
    return new Promise<boolean>((resolve) => {
      resolvePromise = resolve;
    });
  }

  function handleConfirm() {
    isOpen.value = false;
    resolvePromise(true);
  }

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
