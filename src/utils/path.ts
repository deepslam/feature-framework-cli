import { SourceFile } from 'ts-morph';
import inquirer from 'inquirer';
import fs from 'fs';

export const copyImmediately = (
  file: SourceFile,
  path: string,
): Promise<boolean> => {
  return new Promise(async (resolve) => {
    if (fs.existsSync(path)) {
      inquirer
        .prompt({
          type: 'confirm',
          name: 'overwrite_file_confirm',
          message: `File ${path} already exists. Would you like to overwrite it?`,
        })
        .then(async (answer: { overwrite_file_confirm: boolean }) => {
          if (!answer.overwrite_file_confirm) {
            resolve(false);
          } else {
            const result = await file.copyImmediately(path, {
              overwrite: true,
            });
            if (result) {
              resolve(true);
            }

            resolve(false);
          }
        })
        .catch(() => {
          resolve(false);
        });
    } else {
      const result = await file.copyImmediately(path);
      if (result) {
        resolve(true);
      }

      resolve(false);
    }
  });
};

export const getCwd = (): string => {
  return process.cwd();
};

export const trimPathTrails = (path: string): string => {
  return path.replace(/^\/|\/$/g, '');
};

export const getPath = (path = ''): string => {
  return getCwd() + '/' + trimPathTrails(path);
};

export const getCorePackageDirPath = (): string => {
  return 'node_modules/@feature-framework/core';
};

export const getFeatureClassFilePath = (): string => {
  return getPath('src/templates/NewFeature.ts');
};

export const getTsConfigPath = (): string => {
  return getPath(getCorePackageDirPath() + '/tsconfig.json');
};

export const getPackageJsonPath = (): string => {
  return getPath(getCorePackageDirPath() + '/package.json');
};
