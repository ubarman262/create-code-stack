import { fileURLToPath } from "url";
import { dirname } from "path";
import viteReactPackage from "./vite-react/package.js";
import craPackage from "./cra/package.js";

function getScriptDir() {
  // Get the directory path of the current script
  const __filename = fileURLToPath(import.meta.url);
  const scriptDir = dirname(__filename);

  return scriptDir;
}

const packages = {
  viteReactPackage: function () {
    return viteReactPackage;
  },
  createReactAppPackage: function () {
    return craPackage;
  },
  directory: {
    nodeExpressDir: function () {
      return getScriptDir() + "/node-express-prisma";
    },
  },
};

export default packages;
