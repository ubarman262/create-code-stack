import fs from "fs";
import path from "path";
import packages from "../packages/packages.js";

function viteReact(projectPath, projectName) {
  let packageJson;
  fs.cp(
    packages.directory.viteReactTemplate(),
    projectPath,
    { recursive: true },
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );
  packageJson = packages.viteReactPackage();
  packageJson.name = projectName;
  fs.writeFileSync(
    path.join(projectPath, "package.json"),
    JSON.stringify(packageJson, null, 2)
  );
}

export { viteReact };
