import {
  Project,
  OptionalKind,
  PropertyDeclarationStructure,
  TypeParameterDeclarationStructure,
  ImportDeclarationStructure,
  SourceFile,
  ClassDeclaration,
} from "ts-morph";
import chalk from "chalk";
import { copyImmediately } from "./path";
import { runPrettierOnFile } from "./prettier";

export type NewPropertiesType = Record<
  string,
  OptionalKind<PropertyDeclarationStructure>
>;

export type ImportType = OptionalKind<ImportDeclarationStructure>;

export type TransformFileParams = {
  fileName: string;
  fileCallback?: (file: SourceFile) => void;
  classesMap?: Record<
    string,
    {
      name: string;
      classCallback?: (currentClass: ClassDeclaration) => void;
      parameters?: (string | OptionalKind<TypeParameterDeclarationStructure>)[];
      existingProperties?: Record<string, string>;
      newProperties?: NewPropertiesType;
    }
  >;
  imports?: ImportType[];
  typesMap?: Record<string, string>;
};

export function transformFile(
  project: Project,
  newPath: string,
  {
    classesMap = {},
    typesMap = {},
    fileName,
    imports = [],
    fileCallback,
  }: TransformFileParams
): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      const file = project.getSourceFileOrThrow(fileName);
      if (fileCallback) {
        fileCallback(file);
      }
      Object.keys(classesMap).forEach((oldClassName) => {
        const featureClass = file.getClassOrThrow(oldClassName);
        const currentClass = classesMap[oldClassName];

        featureClass.rename(currentClass.name);
        if (currentClass.parameters) {
          currentClass.parameters.forEach((parameter) => {
            featureClass.addTypeParameter(parameter);
            file.fixMissingImports();
          });
        }
        if (imports) {
          imports.forEach((importStatement) => {
            file.addImportDeclaration(importStatement);
          });
        }
        if (currentClass.existingProperties) {
          Object.keys(currentClass.existingProperties).forEach(
            (existingProperty) => {
              const property = featureClass.getPropertyOrThrow(
                existingProperty
              );
              const newValue = currentClass.existingProperties![
                existingProperty
              ];
              if (typeof newValue === "number") {
                property.setInitializer(`${newValue}`);
              }
              if (typeof newValue === "string") {
                property.setInitializer(`'${newValue}'`);
              }
            }
          );
        }
        if (currentClass.newProperties) {
          Object.keys(currentClass.newProperties).forEach(
            (newProperty: string) => {
              featureClass.addProperty(
                currentClass.newProperties![newProperty]
              );
              file.fixMissingImports();
            }
          );
        }
        if (currentClass.classCallback) {
          currentClass.classCallback(featureClass);
        }
      });

      Object.keys(typesMap).forEach((oldType) => {
        const type = file.getTypeAliasOrThrow(oldType);
        type.rename(typesMap[oldType]);
      });

      // file.organizeImports();
      file.fixMissingImports();
      file.formatText();

      copyImmediately(file, newPath)
        .then((result) => {
          runPrettierOnFile(newPath);
          resolve(result);
        })
        .catch((e) => {
          console.log(chalk.red.bold(e));
          resolve(false);
        });
    } catch (e) {
      console.log(chalk.red.bold(e));
      resolve(false);
    }
  });
}
