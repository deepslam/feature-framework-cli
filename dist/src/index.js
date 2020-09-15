#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var greete_1 = __importDefault(require("./greete"));
var createFeature_1 = __importDefault(require("./createFeature"));
var chalk = require("chalk");
var pckg = require("../package.json");
var Command = require("commander").Command;
var log = console.log;
log(greete_1.default());
var program = new Command();
program.version(pckg.version, "-v", "output the current version");
program
    .command("new:feature <name> [path]")
    .description("define a new feature")
    .action(function (name, path) {
    createFeature_1.default({
        name: name,
    }, path).then(function (result) {
        log(result
            ? chalk.green.bold("Feature successully created")
            : chalk.red.bold("Feature was not created due to the error"));
    });
});
program.parse(process.argv);
//# sourceMappingURL=index.js.map