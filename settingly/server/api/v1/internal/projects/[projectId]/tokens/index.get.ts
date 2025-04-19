import { clerkClient } from "@clerk/nuxt/server";
import { ProjectSchema } from "~/server/models/project";
import { authenticate } from "~/server/utils/auth";
import { Project } from "~/shared/types/projects";

export default defineEventHandler(async (event) => {
  const { user, orgId, has } = await authenticate(event);

  const projectId = getRouterParam(event, "projectId");

  const project = await ProjectSchema.findById(projectId);

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
        "Forbidden: You are not allowed to read tokens for this user",
    });
  } else if (orgId && !has({ permission: "org:tokens:read" })) {
    return createError({
      statusCode: 403,
      statusMessage:
        "Forbidden: You do not have permission to read tokens for this organization",
    });
  }

  const tokens = await TokenSchema.find({
    projectId,
  });

  return await Promise.all(
    tokens.map(async (token) => {
      const decryptedPayload = await verifyJwtToken(token.token);

      return {
        ...(token as any).toObject(),
        permissions: decryptedPayload!.permissions,
        expirationDate: new Date(decryptedPayload!.exp! * 1000).toISOString(),
      };
    })
  );
});
