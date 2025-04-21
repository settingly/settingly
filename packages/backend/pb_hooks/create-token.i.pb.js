/// <reference path="../pb_data/types.d.ts" />

routerAdd(
  "POST",
  "/api/internal/projects/{projectId}/tokens",
  (e) => {
    try {
      const projectId = e.request.pathValue("projectId");

      let project;
      try {
        project = e.app.findRecordById("projects", projectId);
      } catch (err) {
        return e.error(404, err);
      }

      if (!e.requestInfo().body.name) {
        return e.error(400, "Token name is required.");
      }

      const name = e.requestInfo().body.name;

      if (!e.requestInfo().body.responsibilities) {
        return e.error(400, "Token responsibilities are required.");
      }

      const responsibilities = e.requestInfo().body.responsibilities;

      if (!Array.isArray(responsibilities)) {
        return e.error(400, "Token responsibilities must be an array.");
      }

      const validResponsibilities = ["files", "function_benchmarks", "logging"];

      for (const responsibility of responsibilities) {
        if (!validResponsibilities.includes(responsibility)) {
          return e.error(400, `Invalid responsibility: ${responsibility}`);
        }
      }

      if (responsibilities.length === 0) {
        return e.error(400, "Token responsibilities cannot be empty.");
      }

      if (!project.user === e.auth.id) {
        return e.error(
          403,
          "You are not authorized to create a token for this project."
        );
      }

      const jwtSecretKey = $os.getenv("JWT_SECRET_KEY");

      const jwt = $security.createJWT(
        {
          projectId: projectId,
          name: name,
          responsibilities: responsibilities,
        },
        jwtSecretKey,
        90 * 24 * 60 * 60
      );

      let tokenCollection = $app.findCollectionByNameOrId("tokens");

      const tokenRecord = new Record(tokenCollection, {
        project: projectId,
        name: name,
        token: jwt,
      });

      e.app.save(tokenRecord);

      return e.json(200, {
        token: jwt,
        projectId: projectId,
        name: name,
        responsibilities: responsibilities,
      });
    } catch (err) {
      return e.error(500, JSON.stringify(err));
    }
  },
  $apis.requireAuth()
);
