import { clerkClient } from "@clerk/nuxt/server";
import { ProjectSchema } from "~/server/models/project";
import { authenticate } from "~/server/utils/auth";
import { Project } from "~/shared/types/projects";

import * as v from "valibot";
import { DeleteFileSchema } from "~/shared/schemas/files";

export default defineEventHandler(async (event) => {
  const { user, orgId, has } = await authenticate(event);

  const body = v.parse(DeleteFileSchema, getRouterParams(event));

  const file = (await FileSchema.findById(body.id)) as File_;

  if (!file) {
    return createError({
      statusCode: 404,
      statusMessage: "File not found",
    });
  }

  const project = (await ProjectSchema.findById(file.projectId)) as Project;

  if (!project) {
    return createError({
      statusCode: 404,
      statusMessage: "Project not found",
    });
  }

  if (
    project.organization.id !== user.id &&
    project.organization.type === "user"
  ) {
    return createError({
      statusCode: 403,
      statusMessage:
        "Forbidden: You are not allowed to delete files for this user",
    });
  } else if (orgId && !has({ permission: "org:files:delete" })) {
    return createError({
      statusCode: 403,
      statusMessage:
        "Forbidden: You do not have permission to delete files for this organization",
    });
  }

  await FileSchema.deleteOne({
    _id: body.id,
  });
});
