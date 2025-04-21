/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2638834880")

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "date3060926358",
    "max": "",
    "min": "",
    "name": "lastUsed",
    "presentable": true,
    "required": false,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2638834880")

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "date3060926358",
    "max": "",
    "min": "",
    "name": "lastUsed",
    "presentable": true,
    "required": true,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
})
