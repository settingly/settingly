import { ProjectSchema } from "~/server/models/project";
import crypto from "crypto";
import * as v from "valibot";
import { clerkClient } from "@clerk/nuxt/server";
import { authenticate } from "~/server/utils/auth";
import { Project } from "~/shared/types/projects";
import { CreateProjectSchema } from "~/shared/schemas/projects";

export default defineEventHandler(async (event) => {
  const { has, user, orgId } = await authenticate(event);

  const body = v.parse(CreateProjectSchema, await readBody(event));

  if (body.organization.id !== user.id && body.organization.type === "user") {
    return createError({
      statusCode: 403,
      statusMessage:
        "Forbidden: You are not allowed to create projects for this user",
    });
  } else if (orgId && !has({ permission: "org:projects:create" })) {
    return createError({
      statusCode: 403,
      statusMessage:
        "Forbidden: You do not have permission to create projects for this organization",
    });
  }

  const createdDocument = await ProjectSchema.create(body);

  setResponseStatus(event, 201, "Project created successfully");

  return createdDocument;
});
