"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackageJsonPath = exports.getTsConfigPath = exports.getFeatureClassFilePath = exports.getCorePackageDirPath = exports.trimPathTrails = exports.getCwd = exports.getPath = exports.copyImmediately = void 0;
var inquirer_1 = __importDefault(require("inquirer"));
var fs_1 = __importDefault(require("fs"));
exports.copyImmediately = function (file, path) {
    return new Promise(function (resolve) {
        if (fs_1.default.existsSync(path)) {
            inquirer_1.default
                .prompt({
                type: "confirm",
                name: "overwrite_file_confirm",
                message: "File " + path + " already exists. Would you like to overwrite it?",
            })
                .then(function (answer) {
                if (!answer.overwrite_file_confirm) {
                    resolve(false);
                }
                else {
                    if (file.copyImmediately(path, { overwrite: true })) {
                        resolve(true);
                    }
                    resolve(false);
                }
            })
                .catch(function () {
                resolve(false);
            });
        }
        else {
            if (file.copyImmediately(path)) {
                resolve(true);
            }
            resolve(false);
        }
    });
};
exports.getPath = function (path) {
    if (path === void 0) { path = ""; }
    return exports.getCwd() + "/" + exports.trimPathTrails(path);
};
exports.getCwd = function () {
    return process.cwd();
};
exports.trimPathTrails = function (path) {
    return path.replace(/^\/|\/$/g, "");
};
exports.getCorePackageDirPath = function () {
    return "node_modules/@feature-framework/core";
};
exports.getFeatureClassFilePath = function () {
    return exports.getPath("src/templates/NewFeature.ts");
};
exports.getTsConfigPath = function () {
    return exports.getPath(exports.getCorePackageDirPath() + "/tsconfig.json");
};
exports.getPackageJsonPath = function () {
    return exports.getPath(exports.getCorePackageDirPath() + "/package.json");
};
//# sourceMappingURL=path.js.map