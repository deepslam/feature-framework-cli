const pckg = require("../package.json");
const chalk = require("chalk");
const boxen = require("boxen");

export default () => {
  const greetings = [
    chalk.green.bold("Feature framework"),
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
