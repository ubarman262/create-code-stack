import viteReactPackage from "./vite-react/package.js";
import craPackage from "./cra/package.js";
import resolveOwnPath from "../path.js";

const packages = {
  viteReactPackage: function () {
    return viteReactPackage;
  },
  createReactAppPackage: function () {
    return craPackage;
  },
  directory: {
    nodeExpressDir: function () {
      return resolveOwnPath("/packages/node-express-prisma");
    },
    viteReactTemplate: function () {
      return resolveOwnPath("/packages/vite-react/template");
    },
    createReactAppTemplate: function () {
      return resolveOwnPath("/packages/cra/template");
    },
  },
};

export default packages;
