import * as v from "valibot";
import crypto from "node:crypto";
import { CreateFileContentVersionSchema } from "~/shared/schemas/files";

export default defineEventHandler(async (event) => {
  const { user, orgId, has } = await authenticate(event);

  const body = v.parse(CreateFileContentVersionSchema, await readBody(event));

  const file = await FileSchema.findById(body.fileId);

  if (!file) {
    return createError({
      statusCode: 404,
      statusMessage: "File not found",
    });
  }

  const project = (await ProjectSchema.findById(file.projectId)) as Project;

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
        "Forbidden: You are not allowed to create files for this user",
    });
  } else if (orgId) {
    if (
      !has({
        permission: "org:files:update",
      })
    ) {
      return createError({
        statusCode: 403,
        statusMessage:
          "Forbidden: You do not have permission to create new file versions for this organization",
      });
    }
  }

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

  const newFile = await FileSchema.findByIdAndUpdate(
    body.fileId,
    {
      $push: {
        contentVersions: newVersion,
      },
    },
    { new: true }
  );

  setResponseStatus(event, 201, "File version created successfully");

  return newFile;
});
