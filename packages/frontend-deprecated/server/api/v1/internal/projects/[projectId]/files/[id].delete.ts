// import { clerkClient } from "@clerk/nuxt/server";
// import { ProjectSchema } from "~/server/models/project";
// import { authenticate } from "~/server/utils/auth";
// import { Project } from "~/shared/types/projects";

// import * as v from "valibot";
// import { DeleteFileSchema } from "~/shared/schemas/files";

// export default defineEventHandler(async (event) => {
//   const { user, orgId, has } = await authenticate(event);

//   const projectId = getRouterParam(event, "projectId");
//   const fileId = getRouterParam(event, "id");

//   const project = (await ProjectSchema.findById(projectId)) as Project;

//   if (!project) {
//     return createError({
//       statusCode: 404,
//       statusMessage: "Project not found",
//     });
//   }

//   if (
//     project.organization.id !== user.id &&
//     project.organization.type === "user"
//   ) {
//     return createError({
//       statusCode: 403,
//       statusMessage:
//         "Forbidden: You are not allowed to delete files for this user",
//     });
//   } else if (
//     orgId &&
//     !has({ permission: "org:member" }) &&
//     !has({ role: "org:admin" })
//   ) {
//     return createError({
//       statusCode: 403,
//       statusMessage:
//         "Forbidden: You have to be a member of the organization to delete files",
//     });
//   }

//   await FileSchema.deleteOne({
//     _id: fileId,
//   });
// });
