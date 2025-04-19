import { JWTPayload, jwtVerify, SignJWT } from "jose";

export async function verifyJwtToken(token: string) {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET_KEY)
    );
    return payload;
  } catch (error) {
    return null;
  }
}

export async function createJwtToken(payload: JWTPayload) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("90d")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET_KEY));

  return token;
}
