import fs from "fs";

export function readdirRecursively(dir, files = []) {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  const dirs = [];
  for (const dirent of dirents) {
    if (dirent.isDirectory()) dirs.push(`${dir}/${dirent.name}`);
    if (dirent.isFile()) files.push(`${dir}/${dirent.name}`);
  }
  for (const d of dirs) {
    files = readdirRecursively(d, files);
  }
  return files;
}
