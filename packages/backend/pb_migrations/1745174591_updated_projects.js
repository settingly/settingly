/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_484305853")

  // update collection data
  unmarshal({
    "createRule": "  @request.auth.id != \"\" && user.id = @request.auth.id && @request.auth.verified = true"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_484305853")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id != \"\" && user.id = @request.auth.id"
  }, collection)

  return app.save(collection)
})
