import { clerkClient } from "@clerk/nuxt/server";
import { ProjectSchema } from "~/server/models/project";
import { authenticate } from "~/server/utils/auth";
import { Project } from "~/shared/types/projects";

import * as v from "valibot";

const ListFilesSchema = v.object({
  projectId: v.string(),
});

export default defineEventHandler(async (event) => {
  const { user, orgId, has } = await authenticate(event);

  const query = v.parse(ListFilesSchema, getQuery(event));

  const project = (await ProjectSchema.findById(query.projectId)) as Project;

  if (!project) {
    return createError({
      statusCode: 404,
      statusMessage: "Project not found",
    });
  }

  if (
    has({
      permission: "org:files:read",
    })
  ) {
    if (project.organization.id !== orgId) {
      console.log("Org ID", orgId);
      console.log("Project Organization ID", project.organization.id);

      throw createError({
        statusCode: 403,
        statusMessage:
          "Forbidden: You do not have permission to read files for this organization",
      });
    }
  } else {
    throw createError({
      statusCode: 403,
      statusMessage:
        "Forbidden: You are not allowed to read files for this user",
    });
  }

  const files = await FileSchema.find({
    projectId: query.projectId,
  });

  return files;
});
