/// <reference path="../pb_data/types.d.ts" />

routerAdd(
  "GET",
  "/internal/projects/{projectId}/tokens",
  (e) => {
    try {
      const projectId = e.request.pathValue("projectId");

      let project;
      project = e.app.findRecordById("projects", projectId);

      if (!project.user === e.auth.id) {
        return e.error(
          403,
          "You are not authorized to list tokens for this project."
        );
      }

      const tokens = e.app.findRecordsByFilter(
        "tokens",
        `project="${projectId}"`
      );

      const tokenCollection = e.app.findCollectionByNameOrId("tokens");

      const tokensResponse = tokens.map((token) => {
        const decryptedToken = $security.parseJWT(
          token.getString("token"),
          $os.getenv("JWT_SECRET_KEY")
        );

        return {
          collectionId: tokenCollection.id,
          collectionName: tokenCollection.name,
          id: token.getString("id"),
          name: token.getString("name"),
          responsibilities: decryptedToken.responsibilities,
          lastUsed: token.getString("lastUsed"),
          created: token.getString("created"),
          updated: token.getString("updated"),
          expirationDate: new Date(decryptedToken.exp * 1000).toISOString(),
        };
      });

      return e.json(200, tokensResponse);
    } catch (err) {
      return e.error(500, err);
    }
  },
  $apis.requireAuth()
);
