import chalk from 'chalk';
import inquirer from 'inquirer';
import { transformFile } from '../utils/common';
import { getPath } from '../utils/path';
import { getProject } from '../utils/project';

type createAppDataType = {
  name: string;
  path?: string;
};

const createApp = (data: createAppDataType): Promise<boolean> => {
  return new Promise(async (resolve) => {
    try {
      const project = await getProject();
      const newAppFileName = `${data.path}/${data.name}.ts`;
      project.addSourceFileAtPath(
        __dirname + '../../../../src/templates/NewApp.ts',
      );

      transformFile(project, newAppFileName, {
        fileName: 'NewApp.ts',
        classesMap: {
          NewApp: {
            name: `${data.name}`,
          },
        },
        typesMap: {
          NewAppType: `${data.name}Type`,
        },
      })
        .then((result) => resolve(result))
        .catch((e) => {
          console.log(chalk.red.bold(e));
          resolve(false);
        });
    } catch (e) {
      console.log(chalk.red.bold(e));
      resolve(false);
    }
  });
};

export default (data: createAppDataType, path?: string): Promise<boolean> => {
  return new Promise(async (resolve) => {
    data = {
      ...data,
    };

    let pathToSave = getPath(data.name);

    if (path) {
      pathToSave = getPath(path);
    }

    console.log(
      chalk.white.bold(
        'Crafting a new app. Answer a few questions, please.\r\n',
      ),
    );
    inquirer
      .prompt([
        {
          type: 'question',
          name: 'name',
          message: 'Name',
          default: data.name,
        },
        {
          type: 'question',
          name: 'path',
          message: 'Path to save',
          default: pathToSave,
        },
      ])
      .then((answers: Partial<createAppDataType>) => {
        data.path = answers.path!;
        data.name = answers.name!;

        createApp(data).then((res) => {
          resolve(res);
        });
      });
  });
};
