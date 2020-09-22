"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProject = void 0;
var ts_morph_1 = require("ts-morph");
var fs_1 = __importDefault(require("fs"));
exports.getProject = function () {
    var projectOptions = {};
    var tsConfigFilePath = process.cwd() + "/tsconfig.json";
    if (fs_1.default.existsSync(tsConfigFilePath)) {
        projectOptions.tsConfigFilePath = tsConfigFilePath;
    }
    var project = new ts_morph_1.Project(projectOptions);
    return project;
};
//# sourceMappingURL=project.js.map