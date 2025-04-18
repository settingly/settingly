import { clerkClient } from "@clerk/nuxt/server";
import { ProjectSchema } from "~/server/models/project";
import { authenticate } from "~/server/utils/auth";
import { Project } from "~/shared/types/projects";

import * as v from "valibot";
// TODO: 1. Move this to a shared folder; 2. Move to route /files/[...projectId] 3. Add single file fetch endpoint in /files/[...projectId]/[...fileId]
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
    project.organization.id !== user.id &&
    project.organization.type === "user"
  ) {
    return createError({
      statusCode: 403,
      statusMessage:
        "Forbidden: You are not allowed to read files for this user",
    });
  } else if (orgId && !has({ permission: "org:files:read" })) {
    return createError({
      statusCode: 403,
      statusMessage:
        "Forbidden: You do not have permission to read files for this organization",
    });
  }

  const files = await FileSchema.find({
    projectId: query.projectId,
  });

  return files;
});
