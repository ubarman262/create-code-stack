export default {
  name: "node-express-project",
  version: "1.0.0",
  description: "",
  main: "index.js",
  scripts: {
    clean: "rm -rf dist",
    build: "tsc",
    start: "node dist/app.js",
    dev: "nodemon --watch 'src/**/*.ts' --exec 'ts-node' ./app.ts",
    test: 'echo "Error: no test specified" && exit 1',
  },
  keywords: [],
  author: "",
  license: "ISC",
  devDependencies: {
    nodemon: "^3.1.0",
    "ts-node": "^10.9.2",
  },
  dependencies: {
    "@types/body-parser": "^1.19.5",
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "@types/helmet": "^4.0.0",
    "@types/jsonwebtoken": "^9.0.6",
    "@types/morgan": "^1.9.9",
    "@types/node": "^20.14.1",
    "body-parser": "^1.20.2",
    cors: "^2.8.5",
    dotenv: "^16.4.5",
    express: "^4.18.2",
    helmet: "^7.1.0",
    jsonwebtoken: "^9.0.2",
    morgan: "^1.10.0",
    typescript: "^5.4.5",
  },
};
