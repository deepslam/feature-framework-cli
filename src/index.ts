#!/usr/bin/env node

import greete from "./greete";
import createFeature from "./commands/createFeature";
import chalk from "chalk";
import { Command } from "commander";

const pckg = require("../package.json");
const log = console.log;

log(greete());
try {
  const program = new Command();
  program.version(pckg.version, "-v", "output the current CLI version");

  program
    .command("new:feature <name> [path]")
    .description("define a new feature")
    .action((name: string, path: string) => {
      createFeature(
        {
          name,
        },
        path
      ).then((result) => {
        log(
          result
            ? chalk.green.bold("Feature successully created")
            : chalk.red.bold("Feature was not created due to the error")
        );
      });
    });

  program.parse(process.argv);
} catch (e) {
  log(chalk.red.bold(`Error was happened during the execution: ${e}`));
}