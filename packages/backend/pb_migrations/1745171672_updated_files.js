/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3446931122")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id != \"\" && project.user.id = @request.auth.id",
    "deleteRule": "@request.auth.id != \"\" && project.user.id = @request.auth.id",
    "listRule": "@request.auth.id != \"\" && project.user.id = @request.auth.id",
    "updateRule": "@request.auth.id != \"\" && project.user.id = @request.auth.id",
    "viewRule": "@request.auth.id != \"\" && project.user.id = @request.auth.id"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3446931122")

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
