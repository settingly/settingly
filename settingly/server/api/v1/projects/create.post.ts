import { ProjectSchema } from "~/server/models/project";
import crypto from "crypto";
import * as v from "valibot";
import { clerkClient } from "@clerk/nuxt/server";
import { authenticate } from "~/server/utils/auth";
import { Project } from "~/shared/types/projects";

const CreateProjectSchema = v.object({
  name: v.string(),
  description: v.optional(v.string()),
  organization: v.object({
    type: v.union([v.literal("user"), v.literal("organization")]),
    id: v.string(),
  }),
});

export default defineEventHandler(async (event) => {
  const { has, user } = await authenticate(event);

  const body = v.parse(CreateProjectSchema, await readBody(event));

  if (body.organization.type == "organization") {
    if (
      !has({
        permission: "org:projects:create",
      })
    ) {
      return createError({
        statusCode: 403,
        statusMessage:
          "Forbidden: You do not have permission to create projects",
      });
    }
  } else {
    if (user.id !== body.organization.id) {
      return createError({
        statusCode: 403,
        statusMessage:
          "Forbidden: You are not allowed to create projects for this user",
      });
    }
  }

  let createdDocument: Project | null = null;
  try {
    createdDocument = await ProjectSchema.create(body);
  } catch (error) {
    return createError({
      statusCode: 500,
      statusMessage: `Failed to create project: ${(error as Error).message}`,
    });
  }

  setResponseStatus(event, 201, "Project created successfully");

  return createdDocument;
});
