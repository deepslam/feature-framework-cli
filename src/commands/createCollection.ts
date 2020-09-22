import chalk from "chalk";
import inquirer from "inquirer";
import { transformFile } from "../utils/common";
import { getPath } from "../utils/path";
import { getProject } from "../utils/project";

type createCollectionType = {
  name: string;
  path?: string;
};

const defaultData: Partial<createCollectionType> = {};

const createCollection = (data: createCollectionType): Promise<boolean> => {
  return new Promise(async (resolve) => {
    try {
      const project = getProject();
      const newFeatureFileName = `${data.path}/${data.name}.ts`;
      project.addSourceFileAtPath(
        __dirname + "../../../../src/templates/NewCollection.ts"
      );

      transformFile(project, newFeatureFileName, {
        fileName: "NewCollection.ts",
        classesMap: {
          NewCollection: {
            name: `${data.name}Collection`,
          },
        },
        typesMap: {
          CollectionDataType: `${data.name}DataType`,
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
  data: createCollectionType,
  path?: string
): Promise<boolean> => {
  return new Promise(async (resolve) => {
    data = {
      ...defaultData,
      ...data,
    };

    let pathToSave = getPath("Collections");

    if (path) {
      pathToSave = getPath(path);
    }

    console.log(
      chalk.white.bold(
        "Crafting a new model. Answer a few questions, please.\r\n"
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
      .then((answers: Partial<createCollectionType>) => {
        data.path = answers.path!;
        data.name = answers.name!;

        createCollection(data).then((res) => {
          resolve(res);
        });
      });
  });
};
