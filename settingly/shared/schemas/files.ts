import * as v from "valibot";

export const CreateFileSchema = v.object({
  name: v.pipe(
    v.string(),
    v.regex(
      /^[a-zA-Z0-9_-]+$/,
      "Only alphanumeric characters, underscores, and dashes are allowed"
    )
  ),
  projectId: v.string(),
  enabledEndpoints: v.array(v.union([v.literal("rest"), v.literal("graphql")])),
});

export const UpdateFileSchema = v.object({
  name: v.optional(
    v.pipe(
      v.string(),
      v.regex(
        /^[a-zA-Z0-9_-]+$/,
        "Only alphanumeric characters, underscores, and dashes are allowed"
      )
    )
  ),
  enabledEndpoints: v.optional(
    v.array(v.union([v.literal("rest"), v.literal("graphql")]))
  ),
});

export const CreateFileContentVersionSchema = v.object({
  fileId: v.string(),
  content: v.string(),
});
