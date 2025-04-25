import type { File_ } from '@/types/files';

export default function getNewestFileVersion(file: File_) {
  if (!file.versions || file.versions.length === 0) {
    return null;
  }
  const newestVersion = file.versions.reduce((prev, current) => {
    return new Date(prev.created) > new Date(current.created) ? prev : current;
  });

  return newestVersion;
}
