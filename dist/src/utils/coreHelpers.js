"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackageJsonPath = exports.getTsConfigPath = exports.getFeatureClassFilePath = exports.getCorePackageDirPath = void 0;
var path_1 = require("./path");
exports.getCorePackageDirPath = function () {
    return "node_modules/@feature-framework/core";
};
exports.getFeatureClassFilePath = function () {
    return path_1.getPath(exports.getCorePackageDirPath() + "/src/Models/Feature.ts");
};
exports.getTsConfigPath = function () {
    return path_1.getPath(exports.getCorePackageDirPath() + "/tsconfig.json");
};
exports.getPackageJsonPath = function () {
    return path_1.getPath(exports.getCorePackageDirPath() + "/package.json");
};
//# sourceMappingURL=coreHelpers.js.map