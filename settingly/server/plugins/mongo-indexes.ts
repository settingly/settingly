export default defineNitroPlugin(async (nitroApp) => {
  await FileSchema.syncIndexes();
  console.log("File indexes synced");
});
