import { clerkClient, User, AuthObject } from "@clerk/nuxt/server";
import { H3Event } from "../types/nitro";

export async function authenticate(event: H3Event) {
  const auth = event.context.auth() as AuthObject;
  const v = event.context.auth() as AuthObject;

  if (!auth.userId) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized: No user ID provided",
    });
  }

  let user: User;
  try {
    user = await clerkClient(event).users.getUser(auth.userId);
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to retrieve user: ${(error as Error).message}`,
    });
  }

  return { ...auth, user };
}
