import chalk from "chalk";
import inquirer from "inquirer";
import { NewPropertiesType, transformFile } from "../utils/common";
import { getPath } from "../utils/path";
import { getProject } from "../utils/project";

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
              name: "Features",
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
      .then((answers: { features: string[] }) => {
        const implementMembers: Pick<createFeatureDataType, "implements"> = {
          implements: {},
        };
        if (answers.features.includes("Events")) {
          implementMembers.implements!.events = true;
        }
        if (answers.features.includes("Features")) {
          implementMembers.implements!.features = true;
        }
        if (answers.features.includes("Slices")) {
          implementMembers.implements!.slices = true;
        }
        if (answers.features.includes("Translations")) {
          implementMembers.implements!.translations = true;
        }
        if (answers.features.includes("Models")) {
          implementMembers.implements!.models = true;
        }
        if (answers.features.includes("View")) {
          implementMembers.implements!.view = true;
        }
        if (answers.features.includes("Collections")) {
          implementMembers.implements!.collections = true;
        }
        if (answers.features.includes("Data Managers")) {
          implementMembers.implements!.dataManagers = true;
        }
        resolve(implementMembers);
      });
  });
};

const createFeature = (data: createFeatureDataType): Promise<boolean> => {
  return new Promise(async (resolve) => {
    try {
      const project = await getProject();
      const newFeatureFileName = `${data.path}/${data.name}.ts`;
      project.addSourceFileAtPath(
        __dirname + "../../../../src/templates/NewFeature.ts"
      );
      const newProperties: NewPropertiesType = {};
      if (data.implements) {
        if (data.implements?.features) {
          newProperties.features = {
            name: "features",
            type: "Record<string, IFeature>",
            isStatic: false,
            initializer: "{}",
          };
        }

        if (data.implements?.slices) {
          newProperties.slices = {
            name: "slices",
            type: "Record<string, Slice>",
            isStatic: false,
            initializer: "{}",
          };
        }

        if (data.implements?.translations) {
          newProperties.translations = {
            name: "translations",
            type: "Translations<unknown>",
            isStatic: false,
            initializer: "{}",
          };
        }

        if (data.implements?.events) {
          newProperties.events = {
            name: "events",
            type: "Record<string, IEvent<unknown>>",
            isStatic: false,
            initializer: "{}",
          };
        }

        if (data.implements?.view) {
          newProperties.view = {
            name: "view",
            type: "IView<unknown> | null",
            isStatic: false,
            initializer: "null",
          };
        }

        if (data.implements?.collections) {
          newProperties.collections = {
            name: "collections",
            type: "Record<string, IDataCollection<unknown, unknown>>",
            isStatic: false,
            initializer: "{}",
          };
        }

        if (data.implements?.dataManagers) {
          newProperties.dataManagers = {
            name: "dataManagers",
            type: "Record<string, IDataManager<unknown>>",
            isStatic: false,
            initializer: "{}",
          };
        }

        if (data.implements?.models) {
          newProperties.models = {
            name: "models",
            type: "Record<string, IModel<unknown>>",
            isStatic: false,
            initializer: "{}",
          };
        }
      }

      transformFile(project, newFeatureFileName, {
        fileName: "NewFeature.ts",
        classesMap: {
          NewFeature: {
            name: `${data.name}Feature`,
            existingProperties: {
              name: `${data.name}Feature`,
            },
            newProperties,
          },
        },
        typesMap: {
          NewFeatureConfig: `${data.name}FeatureConfig`,
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
  path?: string
): Promise<boolean> => {
  return new Promise(async (resolve) => {
    data = {
      ...defaultData,
      ...data,
    };

    let pathToSave = getPath(`Features/${data.name}`);

    if (path) {
      pathToSave = getPath(path);
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
          choices: ["All", "Custom"],
        },
      ])
      .then((answers: Partial<createFeatureDataType>) => {
        data.path = answers.path!;
        data.name = answers.name!;

        if (answers.implements === "Custom") {
          return getCustomSettings();
        } else {
          return new Promise((resolve) => {
            resolve({
              implements: data.implements,
            });
          }) as Promise<Pick<createFeatureDataType, "implements">>;
        }
      })
      .then((answers: Pick<createFeatureDataType, "implements">) => {
        data = {
          ...data,
          implements: {
            ...answers?.implements,
          },
        };

        createFeature(data).then((res) => {
          resolve(res);
        });
      });
  });
};
