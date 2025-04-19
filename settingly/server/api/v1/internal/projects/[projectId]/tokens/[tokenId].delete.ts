import { clerkClient } from "@clerk/nuxt/server";
import { ProjectSchema } from "~/server/models/project";
import { authenticate } from "~/server/utils/auth";
import { Project } from "~/shared/types/projects";

import * as v from "valibot";
import { DeleteFileSchema } from "~/shared/schemas/files";

export default defineEventHandler(async (event) => {
  const { user, orgId, has } = await authenticate(event);

  const tokenId = getRouterParam(event, "tokenId");

  const token = await TokenSchema.findById(tokenId);

  if (!token) {
    return createError({
      statusCode: 404,
      statusMessage: "Token not found",
    });
  }

  const project = (await ProjectSchema.findById(token.projectId)) as Project;

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
        "Forbidden: You are not allowed to delete tokens for this user",
    });
  } else if (orgId && !has({ role: "org:admin" })) {
    return createError({
      statusCode: 403,
      statusMessage:
        "Forbidden: You have to be a admin of the organization to delete tokens",
    });
  }

  await TokenSchema.deleteOne({
    _id: tokenId,
  });
});
