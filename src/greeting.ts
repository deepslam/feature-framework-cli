const pckg = require("../package.json");
import chalk from "chalk";
import boxen, { Options, BorderStyle } from "boxen";
import fs from "fs";
import path from "path";
import { tsconfigResolver } from "tsconfig-resolver";

const additionalInfo: string[] = [];
const ownPckg = require("../../package.json");

export default async () => {
  const result = await tsconfigResolver();
  if (result.exists) {
    const packageJsonPath = `${path.dirname(
      result.path
    )}/node_modules/@feature-framework/core/package.json`;

    try {
      if (fs.existsSync(packageJsonPath)) {
        const pckg = require(packageJsonPath);
        if (pckg.version)
          additionalInfo.push(
            chalk.white(`Feature Framework: v.${pckg.version}`)
          );
      }
    } catch (e) {}
  }
  const greetings = [
    chalk.green.bold(`Feature Framework CLI v.${ownPckg.version}`),
    ...additionalInfo,
    chalk.white(""),
    chalk.blue(`${pckg.author.url}`),
  ];

  const boxenOptions: Options = {
    padding: 1,
    margin: 1,
    borderStyle: BorderStyle.Double,
    borderColor: "white",
    float: "center",
    align: "center",
  };
  return boxen(greetings.join("\n"), boxenOptions);
};
