"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var pckg = require("../package.json");
var chalk = require("chalk");
var boxen = require("boxen");
var fs = require("fs");
var packageJsonPath = process.cwd() + "/node_modules/@feature-framework/core/package.json";
var additionalInfo = [];
try {
    if (fs.existsSync(packageJsonPath)) {
        var pckg_1 = require(packageJsonPath);
        if (pckg_1.version)
            additionalInfo.push(chalk.white("Feature framework: v." + pckg_1.version));
    }
}
catch (e) { }
exports.default = (function () {
    var greetings = __spreadArrays([
        chalk.green.bold("Feature framework"),
        chalk.white(""),
        chalk.blue("" + pckg.author.url)
    ], additionalInfo);
    var boxenOptions = {
        padding: 1,
        margin: 1,
        borderStyle: "double",
        borderColor: "white",
        float: "center",
        align: "center",
    };
    return boxen(greetings.join("\n"), boxenOptions);
});
//# sourceMappingURL=greete.js.map