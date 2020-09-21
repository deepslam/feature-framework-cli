import { Project } from "ts-morph";
const inquirer = require("inquirer");

export const getProject = (): Project => {
  const project = new Project({
    tsConfigFilePath: `${process.cwd()}/tsconfig.json`,
  });

  return project;
};
