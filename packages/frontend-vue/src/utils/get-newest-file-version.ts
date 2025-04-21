import type { File_ } from '@/types/files';

export default function getNewestFileVersion(file: File_) {
  if (!file.fileVersions || file.fileVersions.length === 0) {
    return null;
  }
  const newestVersion = file.fileVersions.reduce((prev, current) => {
    return new Date(prev.created) > new Date(current.created) ? prev : current;
  });

  return newestVersion;
}
