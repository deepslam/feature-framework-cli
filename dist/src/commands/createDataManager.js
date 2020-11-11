"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var inquirer_1 = __importDefault(require("inquirer"));
var path_1 = __importDefault(require("path"));
var common_1 = require("../utils/common");
var path_2 = require("../utils/path");
var project_1 = require("../utils/project");
var defaultData = {};
var createManager = function (data) {
    return new Promise(function (resolve) { return __awaiter(void 0, void 0, void 0, function () {
        var project, newFeatureFileName, imports, modelFiles, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, project_1.getProject()];
                case 1:
                    project = _a.sent();
                    newFeatureFileName = data.path + "/" + data.name + ".ts";
                    project.addSourceFileAtPath(__dirname + '../../../../src/templates/NewDataManager.ts');
                    imports = [];
                    modelFiles = project_1.findClassInProject(data.project, data.model);
                    if (modelFiles && modelFiles[0]) {
                        imports.push({
                            defaultImport: data.model,
                            moduleSpecifier: path_1.default
                                .relative(path_1.default.dirname(newFeatureFileName), modelFiles[0].getSourceFile().getFilePath())
                                .replace('.ts', ''),
                        });
                    }
                    common_1.transformFile(project, newFeatureFileName, {
                        fileName: 'NewDataManager.ts',
                        imports: imports,
                        classesMap: {
                            NewDataManager: {
                                name: "" + data.name,
                                classCallback: function (cls) {
                                    var _a;
                                    var packMethod = cls.getMethodOrThrow('pack');
                                    var restoreMethod = cls.getMethodOrThrow('restore');
                                    restoreMethod.setReturnType(data.model);
                                    restoreMethod.setBodyText(restoreMethod.getBodyText().replace('NewModel', data.model));
                                    (_a = packMethod.getParameter('data')) === null || _a === void 0 ? void 0 : _a.setType(data.model);
                                    cls.setExtends("DataManager<" + data.model + ">");
                                },
                            },
                        },
                        fileCallback: function (file) {
                            file.getImportDeclarations()[1].remove();
                        },
                    })
                        .then(function (result) { return resolve(result); })
                        .catch(function (e) {
                        console.log(chalk_1.default.red.bold(e));
                        resolve(false);
                    });
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    console.log(chalk_1.default.red.bold(e_1));
                    resolve(false);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
};
exports.default = (function (initialData, path) {
    return new Promise(function (resolve) { return __awaiter(void 0, void 0, void 0, function () {
        var data, _a, pathToSave;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    data = __assign(__assign({}, defaultData), initialData);
                    _a = data;
                    return [4 /*yield*/, project_1.getProject()];
                case 1:
                    _a.project = _b.sent();
                    pathToSave = path_2.getPath('Managers');
                    if (path) {
                        pathToSave = path_2.getPath(path);
                    }
                    console.log(chalk_1.default.white.bold('Crafting a new data manager. Answer a few questions, please.\r\n'));
                    inquirer_1.default
                        .prompt([
                        {
                            type: 'question',
                            name: 'name',
                            message: 'Name',
                            default: data.name,
                        },
                        {
                            type: 'question',
                            name: 'model',
                            message: 'Model to attach to the data manager',
                            default: data.model,
                            validate: function (value) {
                                if (project_1.findClassInProject(data.project, value)) {
                                    return true;
                                }
                                return 'Model has not been found';
                            },
                        },
                        {
                            type: 'question',
                            name: 'path',
                            message: 'Path to save',
                            default: pathToSave,
                        },
                    ])
                        .then(function (answers) {
                        data.path = answers.path;
                        data.name = answers.name;
                        data.model = answers.model;
                        createManager(data).then(function (res) {
                            resolve(res);
                        });
                    });
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=createDataManager.js.map