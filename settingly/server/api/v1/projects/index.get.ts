import { clerkClient } from "@clerk/nuxt/server";
import { ProjectSchema } from "~/server/models/project";
import { authenticate } from "~/server/utils/auth";
import { Project } from "~/shared/types/projects";

export default defineEventHandler(async (event) => {
  const { user, orgId, has } = await authenticate(event);

  let projects;

  if (typeof orgId == "undefined") {
    projects = (await ProjectSchema.find({
      "organization.id": user.id,
    })) as Project[];
  } else {
    if (
      !has({
        permission: "org:projects:read",
      })
    ) {
      return createError({
        statusCode: 403,
        statusMessage:
          "Forbidden: You do not have permission to read projects for this organization",
      });
    }

    projects = (await ProjectSchema.find({
      "organization.id": orgId,
    })) as Project[];
  }

  return projects;
});
