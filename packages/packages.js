import nodeExpressPackage from "./express/package.js";
import nodeExpressPrismaPackage from "./express-prisma/package.js";
import viteReactPackage from "./vite-react/package.js";
import craPackage from "./cra/package.js";
import resolveOwnPath from "../path.js";

const packages = {
  nodeExpressPackage: function () {
    return nodeExpressPackage;
  },
  nodeExpressPrismaPackage: function () {
    return nodeExpressPrismaPackage;
  },
  viteReactPackage: function () {
    return viteReactPackage;
  },
  createReactAppPackage: function () {
    return craPackage;
  },
  directory: {
    nodeExpressDir: function () {
      return resolveOwnPath("/packages/express/template");
    },
    nodeExpressPrismaDir: function () {
      return resolveOwnPath("/packages/express-prisma/template");
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
