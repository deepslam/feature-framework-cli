"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pckg = require("../package.json");
var chalk = require("chalk");
var boxen = require("boxen");
exports.default = (function () {
    var greetings = [
        chalk.green.bold("Feature framework"),
        chalk.white(""),
        chalk.blue("" + pckg.author.url),
    ];
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