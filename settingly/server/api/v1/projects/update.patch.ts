import { ProjectSchema } from "~/server/models/project";
import * as v from "valibot";
import { clerkClient } from "@clerk/nuxt/server";
import { authenticate } from "~/server/utils/auth";
import toMongooseUpdatable from "~/shared/utils/to-mongoose-updatable";

const UpdateProjectSchema = v.object({
  id: v.string(),
  updates: v.object({
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    organization: v.optional(
      v.object({
        type: v.union([v.literal("user"), v.literal("organization")]),
        id: v.string(),
      })
    ),
  }),
});

export default defineEventHandler(async (event) => {
  const { has, orgId, user } = await authenticate(event);

  const body = v.parse(UpdateProjectSchema, await readBody(event));

  const currentProject = (await ProjectSchema.findById(body.id)) as Project;

  if (!currentProject) {
    return createError({
      statusCode: 404,
      statusMessage: "Project not found",
    });
  }

  if (orgId) {
    if (
      !has({
        permission: "org:projects:update",
      })
    ) {
      return createError({
        statusCode: 403,
        statusMessage:
          "Forbidden: You do not have permission to create projects",
      });
    }
  } else {
    if (user.id !== currentProject.organization.id) {
      return createError({
        statusCode: 403,
        statusMessage:
          "Forbidden: You are not allowed to create projects for this user",
      });
    }
  }

  const updates = Object.fromEntries(
    Object.entries(body.updates).filter(([, value]) => value != undefined)
  );

  console.log("Updates:", updates);
  console.log("Mongoose:", toMongooseUpdatable(updates));

  const newProject = await ProjectSchema.findByIdAndUpdate(
    body.id,
    { $set: toMongooseUpdatable(updates) },
    { new: true }
  );

  setResponseStatus(event, 200, "Project updated successfully");

  return newProject;
});
