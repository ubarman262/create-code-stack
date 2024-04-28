import { fileURLToPath } from "url";
import { dirname } from "path";

function resolveOwnPath(path = "") {
  // Get the directory path of the current script
  const __filename = fileURLToPath(import.meta.url);
  const scriptDir = dirname(__filename);
  return scriptDir + path;
}

export default resolveOwnPath;
