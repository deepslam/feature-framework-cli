#!/usr/bin/env node

import chalk from 'chalk';
import program from './getProgram';
import greeting from './greeting';
import createApp from './commands/createApp';
import createFeature from './commands/createFeature';
import createEvent from './commands/createEvent';
import createModel from './commands/createModel';
import createCollection from './commands/createCollection';
import createDataProvider from './commands/createDataProvider';
import createDataManager from './commands/createDataManager';
import createTranslation from './commands/createTranslation';
import createFactory from './commands/createFactory';
import createView from './commands/createView';

const log = console.log;

(async () => {
  log(await greeting());

  try {
    program.version('', '-v', 'output the current CLI version');

    program
      .command('new:app <name> [path]')
      .description('define a new app')
      .action((name: string, path: string) => {
        createApp(
          {
            name,
          },
          path,
        ).then((result) => {
          log(
            result
              ? chalk.green.bold('App successfully created')
              : chalk.red.bold('App was not created due to the error'),
          );
        });
      });

    program
      .command('new:feature <name> [path]')
      .description('define a new feature')
      .action((name: string, path: string) => {
        createFeature(
          {
            name,
          },
          path,
        ).then((result) => {
          log(
            result
              ? chalk.green.bold('Feature successfully created')
              : chalk.red.bold('Feature was not created due to the error'),
          );
        });
      });

    program
      .command('new:model <name> [path]')
      .description('define a new model')
      .action((name: string, path: string) => {
        createModel(
          {
            name,
          },
          path,
        ).then((result) => {
          log(
            result
              ? chalk.green.bold('Model successfully created')
              : chalk.red.bold('Model was not created due to the error'),
          );
        });
      });

    program
      .command('new:event <name> [path]')
      .description('define a new event')
      .action((name: string, path: string) => {
        createEvent(
          {
            name,
          },
          path,
        ).then((result) => {
          log(
            result
              ? chalk.green.bold('Event successfully created')
              : chalk.red.bold('Event was not created due to the error'),
          );
        });
      });

    program
      .command('new:provider <name> [path]')
      .description('define a new data provider')
      .action((name: string, path: string) => {
        createDataProvider(
          {
            name,
          },
          path,
        ).then((result) => {
          log(
            result
              ? chalk.green.bold('Data provider successfully created')
              : chalk.red.bold(
                  'Data provider was not created due to the error',
                ),
          );
        });
      });

    program
      .command('new:manager <name> <model> [path]')
      .description('define a new data manager')
      .action((name: string, model: string, path: string) => {
        createDataManager(
          {
            name,
            model,
          },
          path,
        ).then((result) => {
          log(
            result
              ? chalk.green.bold('Data manager successfully created')
              : chalk.red.bold('Data manager was not created due to the error'),
          );
        });
      });

    program
      .command('new:collection <name> <model> [path]')
      .description('define a new collection')
      .action((name: string, model: string, path: string) => {
        createCollection(
          {
            name,
            model,
          },
          path,
        ).then((result) => {
          log(
            result
              ? chalk.green.bold('Collection successfully created')
              : chalk.red.bold('Collection was not created due to the error'),
          );
        });
      });

    program
      .command('new:factory <name> <model> [path]')
      .description('define a new factory')
      .action((name: string, model: string, path: string) => {
        createFactory(
          {
            name,
            model,
          },
          path,
        ).then((result) => {
          log(
            result
              ? chalk.green.bold('Factory successfully created')
              : chalk.red.bold('Factory was not created due to the error'),
          );
        });
      });

    program
      .command('new:translations <name> [path]')
      .description('define a new translations file')
      .action((name: string, path: string) => {
        createTranslation(
          {
            name,
          },
          path,
        ).then((result) => {
          log(
            result
              ? chalk.green.bold('Translations successfully created')
              : chalk.red.bold(
                  'Translations were not created due to the error',
                ),
          );
        });
      });

    program
      .command('new:view <name> [path]')
      .description('define a new view file')
      .action((name: string, path: string) => {
        createView(
          {
            name,
          },
          path,
        ).then((result) => {
          log(
            result
              ? chalk.green.bold('Translations successfully created')
              : chalk.red.bold(
                  'Translations were not created due to the error',
                ),
          );
        });
      });

    program.option('-d, --debug', 'output extra debugging');
    program.parse(process.argv);
  } catch (e) {
    log(chalk.red.bold(`Error happened during the execution: ${e}`));
  }
})();
