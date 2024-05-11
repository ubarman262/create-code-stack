import fs from "fs";
import path from "path";
import packages from "../packages/packages.js";

function express(projectPath, projectName) {
  let packageJson;
  fs.cp(
    packages.directory.nodeExpressDir(),
    projectPath,
    { recursive: true },
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );
  packageJson = packages.nodeExpressPackage();
  packageJson.name = projectName;
  fs.writeFileSync(
    path.join(projectPath, "package.json"),
    JSON.stringify(packageJson, null, 2)
  );
}

export { express };
