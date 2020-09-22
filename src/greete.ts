const pckg = require("../package.json");
const chalk = require("chalk");
const boxen = require("boxen");
const fs = require("fs");

const packageJsonPath = `${process.cwd()}/node_modules/@feature-framework/core/package.json`;
const additionalInfo: string[] = [];
const ownPckg = require("../../package.json");

try {
  if (fs.existsSync(packageJsonPath)) {
    const pckg = require(packageJsonPath);
    if (pckg.version)
      additionalInfo.push(chalk.white(`Feature Framework: v.${pckg.version}`));
  }
} catch (e) {}

export default () => {
  const greetings = [
    chalk.green.bold(`Feature Framework CLI v.${ownPckg.version}`),
    ...additionalInfo,
    chalk.white(""),
    chalk.blue(`${pckg.author.url}`),
  ];

  const boxenOptions = {
    padding: 1,
    margin: 1,
    borderStyle: "double",
    borderColor: "white",
    float: "center",
    align: "center",
  };
  return boxen(greetings.join("\n"), boxenOptions);
};
