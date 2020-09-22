import { Project, ProjectOptions } from "ts-morph";
import fs from "fs";

export const getProject = (): Project => {
  const projectOptions: ProjectOptions = {};
  const tsConfigFilePath = `${process.cwd()}/tsconfig.json`;
  if (fs.existsSync(tsConfigFilePath)) {
    projectOptions.tsConfigFilePath = tsConfigFilePath;
  }
  const project = new Project(projectOptions);

  return project;
};
