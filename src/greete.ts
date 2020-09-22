const pckg = require("../package.json");
const chalk = require("chalk");
const boxen = require("boxen");
const fs = require("fs");

const packageJsonPath = `${process.cwd()}/node_modules/@feature-framework/core/package.json`;
const additionalInfo: string[] = [];

try {
  if (fs.existsSync(packageJsonPath)) {
    const pckg = require(packageJsonPath);
    if (pckg.version)
      additionalInfo.push(chalk.white(`Feature framework: v.${pckg.version}`));
  }
} catch (e) {}

export default () => {
  const greetings = [
    chalk.green.bold("Feature framework"),
    chalk.white(""),
    chalk.blue(`${pckg.author.url}`),
    ...additionalInfo,
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
