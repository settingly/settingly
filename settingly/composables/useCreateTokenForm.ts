import { toast } from "vue-sonner";

export default function useCreateTokenForm() {
  const isSubmitting = ref(false);
  const permissions = ref<string[]>([]);
  const name = ref("");
  const generatedToken = ref<string | null>("abc");
  const canViewGeneratedToken = ref(false);
  const wasCopied = ref(false);
  const currentProjectId = useCurrentProjectId();

  const submit = async () => {};

  const copyToken = async () => {
    if (generatedToken.value) {
      await navigator.clipboard.writeText(generatedToken.value);
      wasCopied.value = true;
    }
  };

  const reset = () => {
    name.value = "";
    permissions.value = [];
    generatedToken.value = null;
    canViewGeneratedToken.value = false;
    wasCopied.value = false;
  };

  return {
    isSubmitting,
    permissions,
    name,
    submit,
    generatedToken,
    canViewGeneratedToken,
    copyToken,
    wasCopied,
    reset,
  };
}
