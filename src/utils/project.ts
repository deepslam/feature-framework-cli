import { Project, ProjectOptions, ClassDeclaration } from 'ts-morph';
import { tsconfigResolver } from 'tsconfig-resolver';
import { debug } from '../utils/debug';

export const getProject = async (): Promise<Project> => {
  const projectOptions: ProjectOptions = {};
  const result = await tsconfigResolver();
  if (result.exists) {
    projectOptions.tsConfigFilePath = result.path;
    projectOptions.addFilesFromTsConfig = true;
    debug(`tsconfig path: ${result.path}`);
  }
  const project = new Project(projectOptions);

  return project;
};

export function findClassInProject(
  project: Project,
  className: string,
): false | ClassDeclaration[] {
  const foundClasses: ClassDeclaration[] = [];
  project.getSourceFiles().forEach((sourceFile) => {
    try {
      const foundClass = sourceFile.getClassOrThrow(className);
      foundClasses.push(foundClass);
    } catch (e) {}
  });
  if (foundClasses.length === 0) {
    return false;
  }

  return foundClasses;
}
