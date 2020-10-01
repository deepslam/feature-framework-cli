#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import greete from "./greete";
import createFeature from "./commands/createFeature";
import createEvent from "./commands/createEvent";
import createModel from "./commands/createModel";
import createCollection from "./commands/createCollection";
import createDataProvider from "./commands/createDataProvider";
import createTranslation from "./commands/createTranslation";

const log = console.log;

(async () => {
  log(await greete());
  try {
    const program = new Command();
    program.version("", "-v", "output the current CLI version");

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

    program
      .command("new:model <name> [path]")
      .description("define a new model")
      .action((name: string, path: string) => {
        createModel(
          {
            name,
          },
          path
        ).then((result) => {
          log(
            result
              ? chalk.green.bold("Model successully created")
              : chalk.red.bold("Model was not created due to the error")
          );
        });
      });

    program
      .command("new:event <name> [path]")
      .description("define a new event")
      .action((name: string, path: string) => {
        createEvent(
          {
            name,
          },
          path
        ).then((result) => {
          log(
            result
              ? chalk.green.bold("Event successully created")
              : chalk.red.bold("Event was not created due to the error")
          );
        });
      });

    program
      .command("new:dataprovider <name> [path]")
      .description("define a new data provider")
      .action((name: string, path: string) => {
        createDataProvider(
          {
            name,
          },
          path
        ).then((result) => {
          log(
            result
              ? chalk.green.bold("Data provider successully created")
              : chalk.red.bold("Data provider was not created due to the error")
          );
        });
      });

    program
      .command("new:collection <name> <model> [path]")
      .description("define a new collection")
      .action((name: string, model: string, path: string) => {
        createCollection(
          {
            name,
            model,
          },
          path
        ).then((result) => {
          log(
            result
              ? chalk.green.bold("Collection successully created")
              : chalk.red.bold("Collection was not created due to the error")
          );
        });
      });

    program
      .command("new:translations <name> [path]")
      .description("define a new translations file")
      .action((name: string, path: string) => {
        createTranslation(
          {
            name,
          },
          path
        ).then((result) => {
          log(
            result
              ? chalk.green.bold("Translations successully created")
              : chalk.red.bold("Translations were not created due to the error")
          );
        });
      });

    program.parse(process.argv);
  } catch (e) {
    log(chalk.red.bold(`Error was happened during the execution: ${e}`));
  }
})();
