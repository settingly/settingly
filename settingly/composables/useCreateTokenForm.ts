import { toast } from "vue-sonner";
import * as v from "valibot";
import { CreateTokenSchema } from "~/shared/schemas/tokens";

export default function useCreateTokenForm() {
  const isSubmitting = ref(false);
  const permissions = ref<string[]>([]);
  const name = ref("");
  const generatedToken = ref<string | null>(null);
  const canViewGeneratedToken = ref(false);
  const wasCopied = ref(false);

  const submit = async () => {
    isSubmitting.value = true;

    try {
      const body = v.parse(CreateTokenSchema, {
        name: name.value,
        projectId: useCurrentProjectId().value,
        permissions: permissions.value,
      });

      const jwt = await $fetch<string>(
        `/api/v1/internal/projects/${useCurrentProjectId().value}/tokens`,
        {
          method: "POST",
          body: body,
        }
      );
      generatedToken.value = jwt;
      canViewGeneratedToken.value = false;
      isSubmitting.value = false;
      toast.success("Token created successfully!");

      await useTokensStore().refetchTokens();
    } catch (error) {
      toast.error(
        parseReadableServerError(
          (error as Error).message || "Failed to create token"
        )
      );
    } finally {
      isSubmitting.value = false;
    }
  };

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
