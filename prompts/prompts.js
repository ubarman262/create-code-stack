const appPrompts = {
  projectName: {
    type: "input",
    name: "projectName",
    default: "code-stack-app",
    message: "Enter your project name:",
    validate: (input) => {
      if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
      return "Project name may only include letters, numbers, underscores and hashes.";
    },
  },
  stack: {
    type: "list",
    name: "stack",
    message: "Choose your project stack:",
    choices: ["Full-stack", "Backend", "Frontend"],
  },
  frontendTemplate: {
    type: "list",
    name: "template",
    message: "Choose your UI template:",
    choices: ["vite", "CRA (Create React App)"],
  },
  installDependencies: {
    type: "confirm",
    name: "installDependencies",
    message: "Do you want to install dependencies after project creation?",
    default: true,
  },
};

export default appPrompts;
