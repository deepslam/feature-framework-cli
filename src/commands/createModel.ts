import chalk from 'chalk';
import inquirer from 'inquirer';
import { NewPropertiesType, transformFile } from '../utils/common';
import { getPath } from '../utils/path';
import { getProject } from '../utils/project';

type createModelDataType = {
  name: string;
  path?: string;
  implementEvents?: boolean;
};

const defaultData: Partial<createModelDataType> = {};

const createModel = (data: createModelDataType): Promise<boolean> => {
  return new Promise(async (resolve) => {
    try {
      const project = await getProject();
      const newFeatureFileName = `${data.path}/${data.name}.ts`;
      project.addSourceFileAtPath(
        __dirname + '../../../../src/templates/NewModel.ts',
      );

      const newProperties: NewPropertiesType = {};

      if (data.implementEvents) {
        newProperties.events = {
          name: 'events',
          type: 'Record<string, IEvent<unknown>>',
          isStatic: false,
          initializer: '{}',
        };
      }

      transformFile(project, newFeatureFileName, {
        fileName: 'NewModel.ts',
        classesMap: {
          NewModel: {
            name: `${data.name}`,
            newProperties,
          },
        },
        typesMap: {
          NewModelFieldsType: `${data.name}FieldsType`,
        },
        fileCallback: (file) => {
          if (data.implementEvents) {
            file.getImportDeclarations().forEach((importDeclaration) => {
              importDeclaration.remove();
            });
            file.addImportDeclaration({
              defaultImport: '{ IEvent }',
              moduleSpecifier: '@feature-framework/core',
            });
          }
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

export default (data: createModelDataType, path?: string): Promise<boolean> => {
  return new Promise(async (resolve) => {
    data = {
      ...defaultData,
      ...data,
    };

    let pathToSave = getPath('Models');

    if (path) {
      pathToSave = getPath(path);
    }

    console.log(
      chalk.white.bold(
        'Crafting a new model. Answer a few questions, please.\r\n',
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
        {
          type: 'confirm',
          name: 'implementEvents',
          message: 'Do you want to add events implementation?',
          default: false,
        },
      ])
      .then((answers: Partial<createModelDataType>) => {
        data.path = answers.path!;
        data.name = answers.name!;
        data.implementEvents = answers.implementEvents ? true : false;

        createModel(data).then((res) => {
          resolve(res);
        });
      });
  });
};
