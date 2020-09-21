#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var greete_1 = __importDefault(require("./greete"));
var createFeature_1 = __importDefault(require("./commands/createFeature"));
var chalk_1 = __importDefault(require("chalk"));
var commander_1 = require("commander");
var pckg = require("../package.json");
var log = console.log;
log(greete_1.default());
try {
    var program = new commander_1.Command();
    program.version(pckg.version, "-v", "output the current CLI version");
    program
        .command("new:feature <name> [path]")
        .description("define a new feature")
        .action(function (name, path) {
        createFeature_1.default({
            name: name,
        }, path).then(function (result) {
            log(result
                ? chalk_1.default.green.bold("Feature successully created")
                : chalk_1.default.red.bold("Feature was not created due to the error"));
        });
    });
    program.parse(process.argv);
}
catch (e) {
    log(chalk_1.default.red.bold("Error was happened during the execution: " + e));
}
//# sourceMappingURL=index.js.map