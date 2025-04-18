import { ProjectSchema } from "~/server/models/project";
import * as v from "valibot";
import { clerkClient } from "@clerk/nuxt/server";
import { authenticate } from "~/server/utils/auth";
import toMongooseUpdatable from "~/shared/utils/to-mongoose-updatable";
import { UpdateProjectSchema } from "~/shared/schemas/projects";

export default defineEventHandler(async (event) => {
  const { has, orgId, user } = await authenticate(event);

  const projectId = getRouterParam(event, "id");
  const body = v.parse(UpdateProjectSchema, await readBody(event));

  const currentProject = (await ProjectSchema.findById(projectId)) as Project;

  if (!currentProject) {
    return createError({
      statusCode: 404,
      statusMessage: "Project not found",
    });
  }

  if (
    currentProject.organization.id !== user.id &&
    currentProject.organization.type === "user"
  ) {
    return createError({
      statusCode: 403,
      statusMessage:
        "Forbidden: You are not allowed to update projects for this user",
    });
  } else if (orgId && !has({ permission: "org:projects:update" })) {
    return createError({
      statusCode: 403,
      statusMessage:
        "Forbidden: You do not have permission to update projects for this organization",
    });
  }

  const newProject = await ProjectSchema.findByIdAndUpdate(
    projectId,
    {
      $set: toMongooseUpdatable(
        Object.fromEntries(
          Object.entries(body).filter(([, value]) => value != undefined)
        )
      ),
    },
    { new: true }
  );

  setResponseStatus(event, 200, "Project updated successfully");

  return newProject;
});
