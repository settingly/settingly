import { ProjectSchema } from "~/server/models/project";
import crypto from "crypto";
import * as v from "valibot";
import { clerkClient } from "@clerk/nuxt/server";
import { authenticate } from "~/server/utils/auth";
import { Project } from "~/shared/types/projects";
import { FileSchema } from "~/server/models/file";
import { File_, FileContentVersion } from "~/shared/types/files";
import { CreateFileSchema } from "~/shared/schemas/files";

export default defineEventHandler(async (event) => {
  const { has, user, orgId } = await authenticate(event);

  const body = v.parse(CreateFileSchema, await readBody(event));

  const project = (await ProjectSchema.findById(body.projectId)) as Project;

  if (!project) {
    return createError({
      statusCode: 404,
      statusMessage: "Project not found",
    });
  }

  if (orgId) {
    if (
      !has({
        role: "org:member",
      }) &&
      !has({
        role: "org:admin",
      })
    ) {
      return createError({
        statusCode: 403,
        statusMessage:
          "Forbidden: You have to be a member of the organization to create files",
      });
    }
  } else {
    if (user.id !== project.organization.id) {
      return createError({
        statusCode: 403,
        statusMessage:
          "Forbidden: You are not allowed to create files for this user",
      });
    }
  }

  const filesWithSameName = await FileSchema.find({
    name: body.name,
    projectId: body.projectId,
  });

  if (filesWithSameName.length > 0) {
    return createError({
      statusCode: 409,
      statusMessage: "File with the same name already exists",
    });
  }

  let createdFile: File_ | null = null;
  try {
    createdFile = await FileSchema.create({
      ...body,
      contentVersions: [
        {
          content: JSON.stringify(
            {
              hello: "world",
            },
            null,
            2
          ),
          id: crypto.randomUUID(),
          createdAt: new Date(),
        } as FileContentVersion,
      ],
    });
  } catch (error) {
    return createError({
      statusCode: 500,
      statusMessage: `Failed to create file: ${(error as Error).message}`,
    });
  }

  setResponseStatus(event, 201, "File created successfully");

  return createdFile;
});
