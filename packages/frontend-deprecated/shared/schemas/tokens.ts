import * as v from "valibot";

export const CreateTokenSchema = v.object({
  name: v.string(),
  projectId: v.string(),
  permissions: v.pipe(
    v.array(v.union(TOKEN_PERMISSIONS.map((p) => v.literal(p)))),
    v.minLength(1)
  ),
});
