/// <reference path="../pb_data/types.d.ts" />

onRecordCreate((e) => {
  const projectId = e.record.getString("project");

  const projectRecord = e.app.findRecordById("projects", projectId);
  projectRecord.set("fileCount", projectRecord.getInt("fileCount") + 1);
  e.app.save(projectRecord);

  return e.next();
}, "files");

onRecordDelete((e) => {
  const projectId = e.record.getString("project");
  try {
    const projectRecord = e.app.findRecordById("projects", projectId);
    projectRecord.set("fileCount", projectRecord.getInt("fileCount") - 1);
    e.app.save(projectRecord);
  } catch (err) {
    return e.next();
  }

  return e.next();
}, "files");
