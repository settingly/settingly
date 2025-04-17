export default function getOrganizationType(organizationId: string) {
  if (organizationId.startsWith("org_")) {
    return "organization";
  } else if (organizationId.startsWith("user_")) {
    return "user";
  }
  return "unknown";
}
