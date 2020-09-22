#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var chalk_1 = __importDefault(require("chalk"));
var greete_1 = __importDefault(require("./greete"));
var createFeature_1 = __importDefault(require("./commands/createFeature"));
var createEvent_1 = __importDefault(require("./commands/createEvent"));
var createModel_1 = __importDefault(require("./commands/createModel"));
var createCollection_1 = __importDefault(require("./commands/createCollection"));
var createDataProvider_1 = __importDefault(require("./commands/createDataProvider"));
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
    program
        .command("new:model <name> [path]")
        .description("define a new model")
        .action(function (name, path) {
        createModel_1.default({
            name: name,
        }, path).then(function (result) {
            log(result
                ? chalk_1.default.green.bold("Model successully created")
                : chalk_1.default.red.bold("Model was not created due to the error"));
        });
    });
    program
        .command("new:event <name> [path]")
        .description("define a new event")
        .action(function (name, path) {
        createEvent_1.default({
            name: name,
        }, path).then(function (result) {
            log(result
                ? chalk_1.default.green.bold("Event successully created")
                : chalk_1.default.red.bold("Event was not created due to the error"));
        });
    });
    program
        .command("new:dataprovider <name> [path]")
        .description("define a new data provider")
        .action(function (name, path) {
        createDataProvider_1.default({
            name: name,
        }, path).then(function (result) {
            log(result
                ? chalk_1.default.green.bold("Data provider successully created")
                : chalk_1.default.red.bold("Data provider was not created due to the error"));
        });
    });
    program
        .command("new:collection <name> [path]")
        .description("define a new collection")
        .action(function (name, path) {
        createCollection_1.default({
            name: name,
        }, path).then(function (result) {
            log(result
                ? chalk_1.default.green.bold("Collection successully created")
                : chalk_1.default.red.bold("Collection was not created due to the error"));
        });
    });
    program.parse(process.argv);
}
catch (e) {
    log(chalk_1.default.red.bold("Error was happened during the execution: " + e));
}
//# sourceMappingURL=index.js.map