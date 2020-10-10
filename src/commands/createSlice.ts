import chalk from "chalk";
import inquirer from "inquirer";
import slice from "../templates/NewSlice";
import { transformFile } from "../utils/common";
import { getPath } from "../utils/path";
import { getProject } from "../utils/project";

type createSliceDataType = {
  name: string;
  path?: string;
};

const defaultData: Partial<createSliceDataType> = {};

const createSlice = (data: createSliceDataType): Promise<boolean> => {
  return new Promise(async (resolve) => {
    try {
      const project = await getProject();
      const newFeatureFileName = `${data.path}/${data.name}.ts`;
      project.addSourceFileAtPath(
        __dirname + "../../../../src/templates/NewSlice.ts"
      );

      transformFile(project, newFeatureFileName, {
        fileName: "NewSlice.ts",
        typesMap: {
          NewSliceStateType: `${data.name}StateType`,
        },
        fileCallback: (file) => {
          const sliceVar = file.getVariableDeclarationOrThrow('slice');
          sliceVar.setInitializer(sliceVar.getInitializer()!.getFullText().replace('NewSlice', data.name));
        }
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

export default (data: createSliceDataType, path?: string): Promise<boolean> => {
  return new Promise(async (resolve) => {
    data = {
      ...defaultData,
      ...data,
    };

    let pathToSave = getPath("Slices");

    if (path) {
      pathToSave = getPath(path);
    }

    console.log(
      chalk.white.bold(
        "Crafting a new slice. Answer a few questions, please.\r\n"
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
      .then((answers: Partial<createSliceDataType>) => {
        data.path = answers.path!;
        data.name = answers.name!;

        createSlice(data).then((res) => {
          resolve(res);
        });
      });
  });
};
