export default function useUpdateTokenForm() {
  const isSubmitting = ref(false);
  const permissions = ref<string[]>([]);
  const name = ref("");
  const submit = () => {};

  return {
    isSubmitting,
    permissions,
    name,
    submit,
  };
}
