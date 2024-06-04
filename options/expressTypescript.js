import fs from "fs";
import path from "path";
import packages from "../packages/packages.js";

function expressTypescript(projectPath, projectName) {
  let packageJson;
  fs.cp(
    packages.directory.nodeExpressTypescriptDir(),
    projectPath,
    { recursive: true },
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );
  packageJson = packages.nodeExpressTypescriptPackage();
  packageJson.name = projectName;
  fs.writeFileSync(
    path.join(projectPath, "package.json"),
    JSON.stringify(packageJson, null, 2)
  );
}

export { expressTypescript };
