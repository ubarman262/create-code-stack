import fs from "fs";
import path from "path";
import packages from "../packages/packages.js";

function expressPrisma(projectPath, projectName) {
  let packageJson;
  fs.cp(
    packages.directory.nodeExpressPrismaDir(),
    projectPath,
    { recursive: true },
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );
  packageJson = packages.nodeExpressPrismaPackage();
  packageJson.name = projectName;
  fs.writeFileSync(
    path.join(projectPath, "package.json"),
    JSON.stringify(packageJson, null, 2)
  );
}

export { expressPrisma };
