/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1102639678")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id != \"\" && file.project.user.id = @request.auth.id",
    "deleteRule": "@request.auth.id != \"\" && file.project.user.id = @request.auth.id",
    "listRule": "@request.auth.id != \"\" && file.project.user.id = @request.auth.id",
    "updateRule": "@request.auth.id != \"\" && file.project.user.id = @request.auth.id",
    "viewRule": "@request.auth.id != \"\" && file.project.user.id = @request.auth.id"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1102639678")

  // update collection data
  unmarshal({
    "createRule": null,
    "deleteRule": null,
    "listRule": null,
    "updateRule": null,
    "viewRule": null
  }, collection)

  return app.save(collection)
})
