#!/usr/bin/env node

import { execSync } from "child_process";
import figlet from "figlet";
import fs from "fs";
import inquirer from "inquirer";
import path from "path";
import { createReactApp } from "./options/cra.js";
import { express } from "./options/express.js";
import { viteReact } from "./options/vite.js";
import appPrompts from "./prompts/prompts.js";
import { expressPrisma } from "./options/expressPrisma.js";
import { expressTypescript } from "./options/expressTypescript.js";

async function init() {
  await figlet("Code Stack", function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
    }
  });
  let prompts = [];
  let projectName = process.argv[2];

  if (!/^([A-Za-z\-\\_\d])+$/.test(projectName))
    console.log(
      "Project name may only include letters, numbers, underscores and hashes."
    );

  if (!checkString(projectName)) {
    prompts.push(appPrompts.projectName);
  }
  prompts.push(appPrompts.stack);

  const answers = await inquirer.prompt(prompts);

  projectName = answers.projectName || projectName;

  const projectPath = path.join(process.cwd(), projectName);
  try {
    // Create directory
    fs.mkdirSync(projectPath);

    switch (answers.stack) {
      case "Full-stack": {
        fs.mkdirSync(projectPath + "/backend");
        fs.mkdirSync(projectPath + "/frontend");
        await backendFlow(projectPath + "/backend", projectName + "-api");
        await frontendFLow(projectPath + "/frontend", projectName + "-ui");
        await installDependencies(projectPath, answers.stack);
        break;
      }
      case "Backend":
        await backendFlow(projectPath, projectName);
        await installDependencies(projectPath);
        break;
      case "Frontend": {
        await frontendFLow(projectPath, projectName);
        await installDependencies(projectPath);
        break;
      }
    }
    successMessage(projectName, projectPath);
  } catch (error) {
    fs.rmdirSync(projectPath, { recursive: true });
    if (error.message.includes("file already exists"))
      console.log("Folder is already present");
    console.error(error);
    process.exit(1);
  }
}

async function backendFlow(projectPath, projectName) {
  const answers = await inquirer.prompt(appPrompts.backendTemplate);

  switch (answers.template) {
    case "Express":
      express(projectPath, projectName);
      break;
    case "Express + Typescript":
      expressTypescript(projectPath, projectName);
      break;
    case "Express + Prisma ORM":
      expressPrisma(projectPath, projectName);
      break;
    default:
      console.error("Invalid template choice");
      return;
  }
}

async function frontendFLow(projectPath, projectName) {
  const answers = await inquirer.prompt(appPrompts.frontendTemplate);

  switch (answers.template) {
    case "vite":
      viteReact(projectPath, projectName);
      break;
    case "CRA (Create React App)":
      createReactApp(projectPath, projectName);
      break;
    default:
      console.error("Invalid template choice");
      return;
  }
}

async function installDependencies(projectPath, stack) {
  const answers = await inquirer.prompt(appPrompts.installDependencies);
  if (answers.installDependencies) {
    if (stack === "Full-stack") {
      console.log(`Installing backend dependencies...`);

      execSync(`cd ${projectPath}/backend && npm install`, {
        stdio: "inherit",
      });

      console.log(`Installing frontend dependencies...`);

      execSync(`cd ${projectPath}/frontend && npm install`, {
        stdio: "inherit",
      });
    } else {
      console.log(`Installing dependencies...`);
      execSync(`cd ${projectPath} && npm install`, {
        stdio: "inherit",
      });
    }
  }
}

function successMessage(projectName, projectPath) {
  console.log(
    `Your project "${projectName}" has been created successfully at ${projectPath}`
  );
  console.log("Happy Coding!");
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
