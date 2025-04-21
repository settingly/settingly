import * as v from "valibot";

export const CreateProjectSchema = v.object({
  name: v.string(),
  description: v.optional(v.string()),
  organization: v.object({
    type: v.union([v.literal("user"), v.literal("organization")]),
    id: v.string(),
  }),
});

export const UpdateProjectSchema = v.object({
  name: v.optional(v.string()),
  description: v.optional(v.string()),
  organization: v.optional(
    v.object({
      type: v.union([v.literal("user"), v.literal("organization")]),
      id: v.string(),
    })
  ),
});
