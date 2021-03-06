import chalk from 'chalk';
import inquirer from 'inquirer';
import { transformFile } from '../utils/common';
import { getPath } from '../utils/path';
import { getProject } from '../utils/project';

type createFeatureDataType = {
  name: string;
  path?: string;
};

const createFeature = (data: createFeatureDataType): Promise<boolean> => {
  return new Promise(async (resolve) => {
    try {
      const project = await getProject();
      const newFeatureFileName = `${data.path}/${data.name}.ts`;
      project.addSourceFileAtPath(
        __dirname + '../../../../src/templates/NewFeature.ts',
      );

      transformFile(project, newFeatureFileName, {
        fileName: 'NewFeature.ts',
        classesMap: {
          NewFeature: {
            name: `${data.name}`,
            existingProperties: {
              name: `${data.name}`,
            },
          },
        },
        typesMap: {
          NewFeatureType: `${data.name}Type`,
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

export default (
  data: createFeatureDataType,
  path?: string,
): Promise<boolean> => {
  return new Promise(async (resolve) => {
    data = {
      ...data,
    };

    let pathToSave = getPath(`Features/${data.name}`);

    if (path) {
      pathToSave = getPath(path);
    }

    console.log(
      chalk.white.bold(
        'Crafting a new feature. Answer a few questions, please.\r\n',
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
      .then((answers: Partial<createFeatureDataType>) => {
        data.path = answers.path!;
        data.name = answers.name!;

        createFeature(data).then((res) => {
          resolve(res);
        });
      });
  });
};
