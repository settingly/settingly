import { ProjectSchema } from "~/server/models/project";
import * as v from "valibot";
import crypto from "node:crypto";
import { authenticate } from "~/server/utils/auth";
import toMongooseUpdatable from "~/shared/utils/to-mongoose-updatable";
import { UpdateFileSchema } from "~/shared/schemas/files";

export default defineEventHandler(async (event) => {
  const { has, orgId, user } = await authenticate(event);

  const fileId = getRouterParam(event, "id");

  const body = v.parse(UpdateFileSchema, await readBody(event));

  const currentFile = (await FileSchema.findById(fileId)) as File_;

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

  let newFile;
  if (body.enabledEndpoints || body.name) {
    newFile = await FileSchema.findByIdAndUpdate(
      fileId,
      {
        $set: toMongooseUpdatable({
          name: body.name,
          enabledEndpoints: body.enabledEndpoints,
        }),
      },
      { new: true }
    );
  }

  if (body.content) {
    let contentAsJSON;
    try {
      contentAsJSON = JSON.parse(body.content);
    } catch (error) {
      return createError({
        statusCode: 400,
        statusMessage: "Invalid JSON",
      });
    }

    const newVersion = {
      id: crypto.randomBytes(16).toString("hex"),
      content: body.content,
      createdAt: new Date(),
    };

    newFile = await FileSchema.findByIdAndUpdate(
      fileId,
      {
        $push: {
          contentVersions: newVersion,
        },
      },
      { new: true }
    );
  }

  setResponseStatus(event, 200, "File updated successfully");

  return newFile;
});
