import chalk from 'chalk';
import inquirer from 'inquirer';
import { transformFile } from '../utils/common';
import { getPath } from '../utils/path';
import { getProject } from '../utils/project';

type createViewType = {
  name: string;
  path?: string;
};

const defaultData: Partial<createViewType> = {};

const createView = (data: createViewType): Promise<boolean> => {
  return new Promise(async (resolve) => {
    try {
      const project = await getProject();
      const newFeatureFileName = `${data.path}/${data.name}.ts`;
      project.addSourceFileAtPath(
        __dirname + '../../../../src/templates/NewView.ts',
      );

      transformFile(project, newFeatureFileName, {
        fileName: 'NewView.ts',
        classesMap: {
          NewView: {
            name: `${data.name}View`,
          },
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

export default (data: createViewType, path?: string): Promise<boolean> => {
  return new Promise(async (resolve) => {
    data = {
      ...defaultData,
      ...data,
    };

    let pathToSave = getPath('Views');

    if (path) {
      pathToSave = getPath(path);
    }

    console.log(
      chalk.white.bold(
        'Crafting a new view file. Answer a few questions, please.\r\n',
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
      .then((answers: Partial<createViewType>) => {
        data.path = answers.path!;
        data.name = answers.name!;

        createView(data).then((res) => {
          resolve(res);
        });
      });
  });
};
