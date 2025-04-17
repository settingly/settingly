import { clerkClient, User } from "@clerk/nuxt/server";
import { H3Event } from "../types/nitro";
import { Project } from "~/shared/types/projects";

export async function canUpdateProject(
  event: H3Event,
  project: Project,
  user: User
) {
  const organization = clerkClient(event).organizations.getOrganization({
    organizationId: project.organization.id,
  });

  await organization;
}
