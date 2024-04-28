#!/usr/bin/env node

import inquirer from "inquirer";
import figlet from "figlet";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import packages from "./packages/packages.js";

async function init() {
  await figlet("Code Stack", function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
  });
  let prompts = [];
  let appName = process.argv[2];

  if (!/^([A-Za-z\-\\_\d])+$/.test(appName))
    console.log(
      "Project name may only include letters, numbers, underscores and hashes."
    );

  const appNamePrompt = {
    type: "input",
    name: "projectName",
    default: "code-stack-app",
    message: "Enter your project name:",
    validate: (input) => {
      if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
      return "Project name may only include letters, numbers, underscores and hashes.";
    },
  };

  const stackPrompt = {
    type: "list",
    name: "stack",
    message: "Choose your project stack:",
    choices: ["Full-stack", "Backend", "Frontend"],
  };

  const templateChoicePrompt = {
    type: "list",
    name: "template",
    message: "Choose your project template:",
    choices: ["vite", "CRA (Create React App)"],
  };

  const dependenciesPrompt = {
    type: "confirm",
    name: "installDependencies",
    message: "Do you want to install dependencies after project creation?",
    default: true,
  };

  if (!checkString(appName)) {
    prompts.push(appNamePrompt);
  }
  prompts.push(stackPrompt);
  prompts.push(templateChoicePrompt);
  prompts.push(dependenciesPrompt);

  const answers = await inquirer.prompt(prompts);

  const projectPath = path.join(process.cwd(), answers.projectName || appName);

  // Create directory
  fs.mkdirSync(projectPath);

  switch (answers.stack) {
    case "Full-stack":
      // Create directory
      fs.mkdirSync(projectPath + "/backend");
      fs.mkdirSync(projectPath + "/frontend");
      // copy backend directory
      fs.cp(
        packages.directory.nodeExpressDir(),
        projectPath + "/backend",
        { recursive: true },
        (err) => {
          if (err) {
            console.error(err);
          }
        }
      );
      break;
    case "Backend":
      console.log("backend");
      break;
    case "Frontend":
      console.log("frontend");
      break;
  }

  // Create package.json based on the selected template
  let packageJson;
  switch (answers.template) {
    case "vite":
      packageJson = packages.viteReactPackage();
      break;
    case "CRA (Create React App)":
      packageJson = packages.createReactAppPackage();
      break;
    default:
      console.error("Invalid template choice");
      return;
  }
  packageJson.name = answers.projectName || appName;

  fs.writeFileSync(
    path.join(projectPath, "package.json"),
    JSON.stringify(packageJson, null, 2)
  );

  console.log(
    `Your project "${
      answers.projectName || appName
    }" has been created successfully at ${projectPath}`
  );

  // Optionally, you can install dependencies
  if (answers.installDependencies) {
    console.log(`Installing dependencies...`);
    execSync(`cd ${projectPath} && npm install`, { stdio: "inherit" });
  }

  console.log("Done!");
}

function vesionCheck() {
  const currentNodeVersion = process.versions.node;
  const semver = currentNodeVersion.split(".");
  const major = semver[0];

  if (major < 14) {
    console.error(
      "You are running Node " +
        currentNodeVersion +
        ".\n" +
        "Create Code Stack requires Node 14 or higher. \n" +
        "Please update your version of Node."
    );
    process.exit(1);
  }

  init();
}

function checkString(str) {
  return !(str === null || str === undefined || str === "");
}
vesionCheck();
