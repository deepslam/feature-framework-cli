import chalk from "chalk";
import inquirer from "inquirer";
import { Project } from "ts-morph";
import path from "path";
import { transformFile, ImportType } from "../utils/common";
import { getPath } from "../utils/path";
import { getProject, findClassInProject } from "../utils/project";

type createDataManagerType = {
  name: string;
  model: string;
  path?: string;
  project?: Project;
};

const defaultData: Partial<createDataManagerType> = {};

const createManager = (data: createDataManagerType): Promise<boolean> => {
  return new Promise(async (resolve) => {
    try {
      const project = await getProject();
      const newFeatureFileName = `${data.path}/${data.name}.ts`;
      project.addSourceFileAtPath(
        __dirname + "../../../../src/templates/NewDataManager.ts"
      );

      const imports: ImportType[] = [];
      const modelFiles = findClassInProject(data.project!, data.model);

      if (modelFiles && modelFiles[0]) {
        imports.push({
          defaultImport: data.model,
          moduleSpecifier: path
            .relative(
              path.dirname(newFeatureFileName),
              modelFiles[0].getSourceFile().getFilePath()
            )
            .replace(".ts", ""),
        });
      }

      transformFile(project, newFeatureFileName, {
        fileName: "NewDataManager.ts",
        imports,
        classesMap: {
          NewDataManager: {
            name: `${data.name}`,
            classCallback: (cls) => {
              const packMethod = cls.getMethodOrThrow("pack");
              const restoreMethod = cls.getMethodOrThrow("restore");

              restoreMethod.setReturnType(data.model);
              restoreMethod.setBodyText(
                restoreMethod.getBodyText()!.replace("NewModel", data.model)
              );

              packMethod.getParameter("data")?.setType(data.model);

              cls.setExtends(`DataManager<${data.model}>`);
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

export default (
  initialData: createDataManagerType,
  path?: string
): Promise<boolean> => {
  return new Promise(async (resolve) => {
    const data: createDataManagerType = {
      ...defaultData,
      ...initialData,
    };
    data.project = await getProject();

    let pathToSave = getPath("Managers");

    if (path) {
      pathToSave = getPath(path);
    }

    console.log(
      chalk.white.bold(
        "Crafting a new data manager. Answer a few questions, please.\r\n"
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
          name: "model",
          message: "Model to attach to the data manager",
          default: data.model,
          validate: function (value) {
            if (findClassInProject(data.project!, value)) {
              return true;
            }

            return "Model has not been found";
          },
        },
        {
          type: "question",
          name: "path",
          message: "Path to save",
          default: pathToSave,
        },
      ])
      .then((answers: Partial<createDataManagerType>) => {
        data.path = answers.path!;
        data.name = answers.name!;
        data.model = answers.model!;

        createManager(data).then((res) => {
          resolve(res);
        });
      });
  });
};
