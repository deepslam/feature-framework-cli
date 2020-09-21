import { Project, OptionalKind, PropertyDeclarationStructure } from "ts-morph";
import chalk from "chalk";
import { copyImmediately } from "./path";

export type NewPropertiesType = Record<
  string,
  OptionalKind<PropertyDeclarationStructure>
>;

export type TransformFileParams = {
  fileName: string;
  classesMap?: Record<
    string,
    {
      name: string;
      existingProperties?: Record<string, string>;
      newProperties?: NewPropertiesType;
    }
  >;
  typesMap?: Record<string, string>;
};

export function transformFile(
  project: Project,
  newPath: string,
  { classesMap = {}, typesMap = {}, fileName }: TransformFileParams
): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      const file = project.getSourceFileOrThrow(fileName);
      Object.keys(classesMap).forEach((oldClassName) => {
        const featureClass = file.getClassOrThrow(oldClassName);
        const currentClass = classesMap[oldClassName];
        featureClass.rename(currentClass.name);
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
      });

      Object.keys(typesMap).forEach((oldType) => {
        const type = file.getTypeAliasOrThrow(oldType);
        type.rename(typesMap[oldType]);
      });

      file.organizeImports();

      copyImmediately(file, newPath)
        .then((result) => {
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
