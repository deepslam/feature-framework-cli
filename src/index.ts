#!/usr/bin/env node

import greete from "./greete";
import createFeature from "./createFeature";

const chalk = require("chalk");
const pckg = require("../package.json");
const { Command } = require("commander");
const log = console.log;

log(greete());

const program = new Command();
program.version(pckg.version, "-v", "output the current version");

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
