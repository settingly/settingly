import * as v from "valibot";

const fileNameSchema = v.pipe(
  v.string(),
  v.regex(
    /^[a-zA-Z0-9_-]+$/,
    "Only alphanumeric characters, underscores, and dashes are allowed"
  )
);

const enabledEndpointsSchema = v.array(
  v.union([v.literal("rest"), v.literal("graphql")])
);

export const CreateFileSchema = v.object({
  name: fileNameSchema,
  projectId: v.string(),
  enabledEndpoints: enabledEndpointsSchema,
});

export const UpdateFileSchema = v.object({
  id: v.string(),
  name: v.optional(fileNameSchema),
  enabledEndpoints: v.optional(enabledEndpointsSchema),
});

export const CreateFileContentVersionSchema = v.object({
  fileId: v.string(),
  content: v.string(),
});
