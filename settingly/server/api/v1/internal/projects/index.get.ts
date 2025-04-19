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
        role: "org:member",
      }) &&
      !has({ role: "org:admin" })
    ) {
      return createError({
        statusCode: 403,
        statusMessage:
          "Forbidden: You have to be a member of the organization to view projects",
      });
    }

    projects = (await ProjectSchema.find({
      "organization.id": orgId,
    })) as Project[];
  }

  return await Promise.all(
    projects.map(async (project) => {
      const files = await FileSchema.find({
        projectId: project._id,
      });
      const filesCount = files.length;

      return {
        ...(project as any).toObject(),
        filesCount,
      };
    })
  );
});
