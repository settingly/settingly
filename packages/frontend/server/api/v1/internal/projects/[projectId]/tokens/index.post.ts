import { ProjectSchema } from "~/server/models/project";
import crypto from "crypto";
import * as v from "valibot";
import { clerkClient } from "@clerk/nuxt/server";
import { authenticate } from "~/server/utils/auth";
import { Project } from "~/shared/types/projects";
import { CreateProjectSchema } from "~/shared/schemas/projects";
import { CreateTokenSchema } from "~/shared/schemas/tokens";
import { createJwtToken } from "~/server/utils/jwt";

export default defineEventHandler(async (event) => {
  const { has, user, orgId } = await authenticate(event);

  const body = v.parse(CreateTokenSchema, await readBody(event));

  const project = (await ProjectSchema.findById(body.projectId)) as Project;

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
        "Forbidden: You are not allowed to create tokens for this user",
    });
  } else if (orgId && !has({ role: "org:admin" })) {
    return createError({
      statusCode: 403,
      statusMessage:
        "Forbidden: You have to be a admin of the organization to create tokens",
    });
  }

  const token = await createJwtToken({
    permissions: body.permissions,
    projectId: body.projectId,
    name: body.name,
  });

  await TokenSchema.create({ ...body, token });

  setResponseStatus(event, 201, "Project created successfully");

  return token;
});
