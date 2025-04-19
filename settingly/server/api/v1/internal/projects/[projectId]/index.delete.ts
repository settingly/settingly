import { ProjectSchema } from "~/server/models/project";
import { authenticate } from "~/server/utils/auth";
import { Project } from "~/shared/types/projects";

export default defineEventHandler(async (event) => {
  const { user, orgId, has } = await authenticate(event);

  const projectId = getRouterParam(event, "projectId");

  const project = (await ProjectSchema.findById(projectId)) as Project;

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
        "Forbidden: You are not allowed to delete projects for this user",
    });
  } else if (orgId && !has({ permission: "org:projects:delete" })) {
    return createError({
      statusCode: 403,
      statusMessage:
        "Forbidden: You do not have permission to delete projects for this organization",
    });
  }

  await ProjectSchema.deleteOne({
    _id: projectId,
  });

  await FileSchema.deleteMany({
    projectId,
  });
});
