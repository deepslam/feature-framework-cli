import chalk from "chalk";
import inquirer from "inquirer";
import { transformFile } from "../utils/common";
import { getPath } from "../utils/path";
import { getProject } from "../utils/project";

type createEventDataType = {
  name: string;
  path?: string;
};

const defaultData: Partial<createEventDataType> = {};

const createEvent = (data: createEventDataType): Promise<boolean> => {
  return new Promise(async (resolve) => {
    try {
      const project = await getProject();
      const newFeatureFileName = `${data.path}/${data.name}.ts`;
      project.addSourceFileAtPath(
        __dirname + "../../../../src/templates/NewEvent.ts"
      );

      transformFile(project, newFeatureFileName, {
        fileName: "NewEvent.ts",
        classesMap: {
          NewEvent: {
            name: `${data.name}Event`,
          },
        },
        typesMap: {
          NewEventCallbackType: `${data.name}EventCallbackType`,
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

export default (data: createEventDataType, path?: string): Promise<boolean> => {
  return new Promise(async (resolve) => {
    data = {
      ...defaultData,
      ...data,
    };

    let pathToSave = getPath("Events");

    if (path) {
      pathToSave = getPath(path);
    }

    console.log(
      chalk.white.bold(
        "Crafting a new event. Answer a few questions, please.\r\n"
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
      .then((answers: Partial<createEventDataType>) => {
        data.path = answers.path!;
        data.name = answers.name!;

        createEvent(data).then((res) => {
          resolve(res);
        });
      });
  });
};
