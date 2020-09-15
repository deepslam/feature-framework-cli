import chalk from "chalk";
import { readAndCompileTemplate, saveToFile } from "./utils/common";

const inquirer = require("inquirer");

type createFeatureDataType = {
  name: string;
  path?: string;
  implements?: {
    events?: boolean;
    features?: boolean;
    slices?: boolean;
    translations?: boolean;
    view?: boolean;
    models?: boolean;
    collections?: boolean;
    dataManagers?: boolean;
  };
};

const defaultData: Partial<createFeatureDataType> = {
  implements: {
    events: true,
    features: true,
    slices: true,
    translations: true,
    view: true,
    models: true,
    collections: true,
    dataManagers: true,
  },
};

const getCustomSettings = (): Promise<
  Pick<createFeatureDataType, "implements">
> => {
  return new Promise((resolve) => {
    inquirer
      .prompt([
        {
          type: "checkbox",
          message: "Please select what you would like to implement",
          name: "features",
          loop: false,
          choices: [
            {
              name: "Events",
              checked: true,
            },
            {
              name: "Sub Features",
              checked: true,
            },
            {
              name: "Slices",
              checked: true,
            },
            {
              name: "Translations",
              checked: true,
            },
            {
              name: "Models",
              checked: true,
            },
            {
              name: "View",
              checked: true,
            },
            {
              name: "Collections",
              checked: true,
            },
            {
              name: "Data Managers",
              checked: true,
            },
          ],
        },
      ])
      .then((answers: string[]) => {
        console.log(JSON.stringify(answers, null, "  "));
        resolve({
          implements: {
            events: false,
          },
        });
      });
  });
};

const createFeature = (data: createFeatureDataType): Promise<boolean> => {
  return new Promise(async (resolve) => {
    try {
      const template = await readAndCompileTemplate(
        "./templates/feature.hbs",
        data
      );
      await saveToFile(`${data.path}/${data.name}.ts`, template);
      resolve(true);
    } catch (e) {
      chalk.red.bold(e.toString());
      resolve(false);
    }
  });
};

export default (
  data: createFeatureDataType,
  path?: string
): Promise<boolean> => {
  return new Promise(async (resolve) => {
    data = {
      ...defaultData,
      ...data,
    };
    let cwd = `${process.cwd()}`;
    let pathToSave = `${cwd}`;

    if (path) {
      pathToSave += `${cwd}/${path.replace(/^\/|\/$/g, "")}`;
    }

    console.log(
      chalk.white.bold(
        "Crafting a new feature. Answer a few questions, please.\r\n"
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
        {
          type: "list",
          name: "implements",
          message: "Which members to implement?",
          choices: ["All possible members", "Customize"],
        },
      ])
      .then((answers: Partial<createFeatureDataType>) => {
        answers.path = pathToSave += `${cwd}/${answers.path!.replace(
          /^\/|\/$/g,
          ""
        )}`;
        data = {
          ...data,
          ...answers,
        };
        if (answers.implements === "Customize") {
          return getCustomSettings();
        } else {
          createFeature(data).then((res) => {
            resolve(res);
          });
        }
      })
      .then((answers: Pick<createFeatureDataType, "implements">) => {
        data = {
          ...data,
          implements: {
            ...data.implements,
            ...answers,
          },
        };

        createFeature(data).then((res) => {
          resolve(res);
        });
      });
  });
};
