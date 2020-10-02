"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformFile = void 0;
var chalk_1 = __importDefault(require("chalk"));
var path_1 = require("./path");
function transformFile(project, newPath, _a) {
    var _b = _a.classesMap, classesMap = _b === void 0 ? {} : _b, _c = _a.typesMap, typesMap = _c === void 0 ? {} : _c, fileName = _a.fileName, _d = _a.imports, imports = _d === void 0 ? [] : _d, fileCallback = _a.fileCallback;
    return new Promise(function (resolve) {
        try {
            var file_1 = project.getSourceFileOrThrow(fileName);
            if (fileCallback) {
                fileCallback(file_1);
            }
            Object.keys(classesMap).forEach(function (oldClassName) {
                var featureClass = file_1.getClassOrThrow(oldClassName);
                var currentClass = classesMap[oldClassName];
                featureClass.rename(currentClass.name);
                if (currentClass.parameters) {
                    currentClass.parameters.forEach(function (parameter) {
                        featureClass.addTypeParameter(parameter);
                        file_1.fixMissingImports();
                    });
                }
                if (imports) {
                    imports.forEach(function (importStatement) {
                        file_1.addImportDeclaration(importStatement);
                    });
                }
                if (currentClass.existingProperties) {
                    Object.keys(currentClass.existingProperties).forEach(function (existingProperty) {
                        var property = featureClass.getPropertyOrThrow(existingProperty);
                        var newValue = currentClass.existingProperties[existingProperty];
                        if (typeof newValue === "number") {
                            property.setInitializer("" + newValue);
                        }
                        if (typeof newValue === "string") {
                            property.setInitializer("'" + newValue + "'");
                        }
                    });
                }
                if (currentClass.newProperties) {
                    Object.keys(currentClass.newProperties).forEach(function (newProperty) {
                        featureClass.addProperty(currentClass.newProperties[newProperty]);
                        file_1.fixMissingImports();
                    });
                }
                if (currentClass.classCallback) {
                    currentClass.classCallback(featureClass);
                }
            });
            Object.keys(typesMap).forEach(function (oldType) {
                var type = file_1.getTypeAliasOrThrow(oldType);
                type.rename(typesMap[oldType]);
            });
            // file.organizeImports();
            file_1.fixMissingImports();
            file_1.formatText();
            path_1.copyImmediately(file_1, newPath)
                .then(function (result) {
                resolve(result);
            })
                .catch(function (e) {
                console.log(chalk_1.default.red.bold(e));
                resolve(false);
            });
        }
        catch (e) {
            console.log(chalk_1.default.red.bold(e));
            resolve(false);
        }
    });
}
exports.transformFile = transformFile;
//# sourceMappingURL=common.js.map