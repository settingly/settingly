export default defineEventHandler(async (event) => {
  const tokenHeader = getHeader(event, "X-Settingly-Token");

  if (!tokenHeader) {
    return createError({
      statusCode: 401,
      statusMessage:
        "Unauthorized:  Please provide a valid token in the 'X-Settingly-Token' header.",
    });
  }

  const payload = await verifyJwtToken(tokenHeader);
  if (!payload) {
    return createError({
      statusCode: 401,
      statusMessage: "Unauthorized: Invalid token.",
    });
  }

  const now = Math.floor(Date.now() / 1000);
  if (payload.exp && payload.exp < now) {
    return createError({
      statusCode: 401,
      statusMessage: "Unauthorized: Token has expired.",
    });
  }

  const tokenFromDb = await TokenSchema.findOne({
    token: tokenHeader,
  });

  if (!tokenFromDb) {
    return createError({
      statusCode: 401,
      statusMessage: "Unauthorized: Token was revoked.",
    });
  }

  if (tokenFromDb.projectId !== payload.projectId) {
    return createError({
      statusCode: 401,
      statusMessage: "Unauthorized: Token does not belong to this project.",
    });
  }

  if (!(payload.permissions as any).includes("org:files:read")) {
    return createError({
      statusCode: 403,
      statusMessage: "Forbidden: Token does not have permission to read files.",
    });
  }

  const fileName = getRouterParam(event, "fileName");

  let file: File_ | null = null;
  try {
    file = await FileSchema.findOne({
      name: fileName,
      projectId: payload.projectId,
    });
  } catch (error) {
    return createError({
      statusCode: 500,
      statusMessage:
        "Invalid file ID: input must be a 24 character hex string, 12 byte Uint8Array, or an integer.",
    });
  }

  if (!file) {
    return createError({
      statusCode: 404,
      statusMessage: "Not Found: File not found.",
    });
  }

  return {
    ...(file as any).toObject(),
    currentVersion: file.contentVersions[file.contentVersions.length - 1],
  };
});
