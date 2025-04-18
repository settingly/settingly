import { ProjectSchema } from "~/server/models/project";
import * as v from "valibot";
import { clerkClient } from "@clerk/nuxt/server";
import { authenticate } from "~/server/utils/auth";
import toMongooseUpdatable from "~/shared/utils/to-mongoose-updatable";
import { UpdateFileSchema } from "~/shared/schemas/files";

export default defineEventHandler(async (event) => {
  const { has, orgId, user } = await authenticate(event);

  const body = v.parse(UpdateFileSchema, await readBody(event));

  const currentFile = (await FileSchema.findById(body.id)) as File_;

  if (!currentFile) {
    return createError({
      statusCode: 404,
      statusMessage: "File not found",
    });
  }

  const project = (await ProjectSchema.findById(
    currentFile.projectId
  )) as Project;

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
        "Forbidden: You are not allowed to update files for this user",
    });
  } else if (orgId && !has({ permission: "org:files:update" })) {
    return createError({
      statusCode: 403,
      statusMessage:
        "Forbidden: You do not have permission to update files for this organization",
    });
  }

  const newFile = await FileSchema.findByIdAndUpdate(
    body.id,
    {
      $set: toMongooseUpdatable({
        name: body.name,
        enabledEndpoints: body.enabledEndpoints,
      }),
    },
    { new: true }
  );

  console.log("Updated file", newFile);

  setResponseStatus(event, 200, "File updated successfully");

  return newFile;
});
