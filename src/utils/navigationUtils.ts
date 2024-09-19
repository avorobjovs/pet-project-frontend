export function setPath(path: string) {
  let newPath = path;
  if (path.startsWith('/')) {
    newPath = path.substring(1);
  }
  newPath = import.meta.env.BASE_URL + newPath;
  return newPath;
}