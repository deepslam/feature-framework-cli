"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProject = void 0;
var ts_morph_1 = require("ts-morph");
var inquirer = require("inquirer");
exports.getProject = function () {
    var project = new ts_morph_1.Project({
        tsConfigFilePath: process.cwd() + "/tsconfig.json",
    });
    return project;
};
//# sourceMappingURL=project.js.map