#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var greete_1 = require("./greete");
var package_json_1 = require("../package.json");
var Command = require("commander").Command;
var log = console.log;
greete_1.default();
var program = new Command();
program.version(package_json_1.default.version, "-v", "output the current version");
program
    .command("new:feature <name>")
    .description("define a new feature")
    .action(function (name) {
    log("new:feature command called");
});
//# sourceMappingURL=index.js.map