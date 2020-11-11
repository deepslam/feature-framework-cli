import chalk from 'chalk';
import inquirer from 'inquirer';
import { Project } from 'ts-morph';
import path from 'path';
import { transformFile, ImportType } from '../utils/common';
import { getPath } from '../utils/path';
import { getProject, findClassInProject } from '../utils/project';

type createFactoryType = {
  name: string;
  model: string;
  path?: string;
  project?: Project;
};

const defaultData: Partial<createFactoryType> = {};

const createFactory = (data: createFactoryType): Promise<boolean> => {
  return new Promise(async (resolve) => {
    try {
      const newFeatureFileName = `${data.path}/${data.name}.ts`;
      data.project!.addSourceFileAtPath(
        __dirname + '../../../../src/templates/NewFactory.ts',
      );
      const imports: ImportType[] = [];
      const modelFiles = findClassInProject(data.project!, data.model);

      if (modelFiles && modelFiles[0]) {
        imports.push({
          defaultImport: data.model,
          moduleSpecifier: path
            .relative(
              path.dirname(newFeatureFileName),
              modelFiles[0].getSourceFile().getFilePath(),
            )
            .replace('.ts', ''),
        });
      }

      transformFile(data.project!, newFeatureFileName, {
        fileName: 'NewFactory.ts',
        imports,
        classesMap: {
          NewFactory: {
            name: `${data.name}`,
            classCallback: (cls) => {
              cls.setExtends(`Factory<typeof ${data.model}>`);
              const modelProperty = cls.getPropertyOrThrow('model');
              modelProperty.setInitializer(data.model);
              modelProperty.setType(`typeof ${data.model}`);
            },
          },
        },
        fileCallback: (file) => {
          file.getImportDeclarations()[1].remove();
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

export default (data: createFactoryType, path?: string): Promise<boolean> => {
  return new Promise(async (resolve) => {
    data.project = await getProject();

    data = {
      ...defaultData,
      ...data,
    };

    let pathToSave = getPath('Factories');

    if (path) {
      pathToSave = getPath(path);
    }

    console.log(
      chalk.white.bold(
        'Crafting a new factory. Answer a few questions, please.\r\n',
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
          name: 'model',
          message: 'Model to attach to the factory',
          default: data.model,
          validate(value) {
            if (findClassInProject(data.project!, value)) {
              return true;
            }

            return 'Model has not been found';
          },
        },
        {
          type: 'question',
          name: 'path',
          message: 'Path to save',
          default: pathToSave,
        },
      ])
      .then((answers: Partial<createFactoryType>) => {
        data.path = answers.path!;
        data.name = answers.name!;
        data.model = answers.model!;

        createFactory(data).then((res) => {
          resolve(res);
        });
      });
  });
};
