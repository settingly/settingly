export default function getNewestFileVersion(file: File_) {
  const newestVersion = file.contentVersions.reduce((prev, current) => {
    return new Date(prev.createdAt) > new Date(current.createdAt)
      ? prev
      : current;
  });

  return newestVersion;
}
