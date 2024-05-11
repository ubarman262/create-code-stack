export default {
  name: "node-express-project",
  version: "1.0.0",
  description: "",
  main: "index.js",
  scripts: {
    test: 'echo "Error: no test specified" && exit 1',
    start: "node app.js",
    dev: "nodemon app.js",
  },
  keywords: [],
  author: "",
  license: "ISC",
  devDependencies: {
    nodemon: "^3.1.0",
  },
  dependencies: {
    "body-parser": "^1.20.2",
    cors: "^2.8.5",
    dotenv: "^16.4.5",
    express: "^4.18.2",
    helmet: "^7.1.0",
    jsonwebtoken: "^9.0.2",
    morgan: "^1.10.0",
  },
};
