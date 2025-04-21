import * as v from "valibot";

const fileNameSchema = v.pipe(
  v.string(),
  v.regex(
    /^[a-zA-Z0-9_-]+$/,
    "Only alphanumeric characters, underscores, and dashes are allowed"
  )
);

export const CreateFileSchema = v.object({
  name: fileNameSchema,
  projectId: v.string(),
});

export const UpdateFileSchema = v.object({
  name: v.optional(fileNameSchema),
  content: v.optional(v.string()),
});

export const DeleteFileSchema = v.object({
  id: v.string(),
});

export const CreateFileContentVersionSchema = v.object({
  fileId: v.string(),
  content: v.string(),
});
