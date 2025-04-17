import * as v from "valibot";

const CreateTokenSchema = v.object({
  name: v.string(),
  permissions: v.array(v.string()),
  projectId: v.string(),
});

export default defineEventHandler(async (event) => {
  const { user } = await authenticate(event);

  const body = v.parse(CreateTokenSchema, await readBody(event));

  // Get existing project
  const existingProject = await ProjectSchema.findOne({ id: body.projectId });

  if (!existingProject) {
    throw createError({
      statusCode: 404,
      statusMessage: "Project not found",
    });
  }

  return user;

  //   // Check if user is owner or admin
  //   const isOwner = existingProject.owner.toString() === user.id;
  //   const isAdmin = existingProject.members.some(
  //     (m) => m.id.toString() === user.id && m.group.toString() === "admin"
  //   );

  //   if (!isOwner && !isAdmin) {
  //     throw createError({
  //       statusCode: 403,
  //       statusMessage: "Unauthorized to update this project",
  //     });
  //   }

  //   const token = new TokenSchema({
  //     name: body.name,
  //     permissions: body.permissions,
  //     projectId: body.projectId,
  //     createdBy: user.id,
  //   });

  //   await token.save();

  //   return token;
});
