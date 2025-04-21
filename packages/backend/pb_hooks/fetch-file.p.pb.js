/// <reference path="../pb_data/types.d.ts" />

routerAdd("GET", "/api/public/projects/{projectId}/files/{fileName}", (e) => {
  try {
    const tokenHeader = e.request.header.get("X-Settingly-Token");
    if (!tokenHeader) {
      return e.error(401, "Missing token header");
    }
    let payload;
    try {
      payload = $security.parseJWT(tokenHeader, $os.getenv("JWT_SECRET_KEY"));
    } catch (err) {
      return e.error(401, "Invalid token");
    }

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) {
      return e.error(401, "Token expired");
    }

    let tokenFromDb;
    try {
      tokenFromDb = e.app.findFirstRecordByFilter(
        "tokens",
        `token="${tokenHeader}"`
      );
    } catch (err) {
      return e.error(401, "Token was revoked");
    }

    try {
      console.log("Project ID: ", payload.projectId);
      const project = e.app.findRecordById("projects", payload.projectId);
    } catch (err) {
      return e.error(404, "Project not found");
    }

    if (tokenFromDb.getString("project") !== payload.projectId) {
      return e.error(401, "Token does not belong to this project");
    }

    if (!payload.responsibilities.includes("files")) {
      return e.error(401, "Token does not have the required responsibilities");
    }

    const fileName = e.request.pathValue("fileName");

    let file;
    try {
      file = e.app.findFirstRecordByFilter(
        "files",
        `name="${fileName}" && project="${payload.projectId}"`
      );
    } catch (err) {
      return e.error(404, "File not found");
    }

    const fileVersions = e.app.findRecordsByFilter(
      "file_versions",
      `file="${file.id}"`
    );

    const currentVersion = fileVersions.sort((a, b) => {
      return b.getDateTime("created") - a.getDateTime("created");
    })[fileVersions.length - 1];

    // update lastUsed
    const lastUsed = new Date();

    tokenFromDb.set("lastUsed", lastUsed.toISOString());
    e.app.save(tokenFromDb);

    e.json(200, {
      file,
      fileVersions,
      currentVersion,
    });
  } catch (err) {
    return e.error(500, err);
  }
});
