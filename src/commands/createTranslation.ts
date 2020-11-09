import chalk from "chalk";
import inquirer from "inquirer";
import { transformFile } from "../utils/common";
import { getPath } from "../utils/path";
import { getProject } from "../utils/project";

type createDataProviderType = {
  name: string;
  path?: string;
};

const defaultData: Partial<createDataProviderType> = {};

const createProvider = (data: createDataProviderType): Promise<boolean> => {
  return new Promise(async (resolve) => {
    try {
      const project = await getProject();
      const newFeatureFileName = `${data.path}/${data.name}.ts`;
      project.addSourceFileAtPath(
        __dirname + "../../../../src/templates/NewTranslations.ts"
      );

      transformFile(project, newFeatureFileName, {
        fileName: "NewTranslations.ts",
        classesMap: {
          NewTranslations: {
            name: `${data.name}`,
          },
        },
        typesMap: {
          NewTranslationsType: `${data.name}TranslationsType`,
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
  data: createDataProviderType,
  path?: string
): Promise<boolean> => {
  return new Promise(async (resolve) => {
    data = {
      ...defaultData,
      ...data,
    };

    let pathToSave = getPath("Translations");

    if (path) {
      pathToSave = getPath(path);
    }

    console.log(
      chalk.white.bold(
        "Crafting a new translations file. Answer a few questions, please.\r\n"
      )
    );
    inquirer
      .prompt([
        {
          type: "question",
          name: "name",
          message: "Name",
          default: data.name,
        },
        {
          type: "question",
          name: "path",
          message: "Path to save",
          default: pathToSave,
        },
      ])
      .then((answers: Partial<createDataProviderType>) => {
        data.path = answers.path!;
        data.name = answers.name!;

        createProvider(data).then((res) => {
          resolve(res);
        });
      });
  });
};
