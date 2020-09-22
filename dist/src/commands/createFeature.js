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
var common_1 = require("../utils/common");
var path_1 = require("../utils/path");
var project_1 = require("../utils/project");
var defaultData = {
    implements: {
        events: true,
        features: true,
        slices: true,
        translations: true,
        view: true,
        models: true,
        collections: true,
        dataManagers: true,
    },
};
var getCustomSettings = function () {
    return new Promise(function (resolve) {
        inquirer_1.default
            .prompt([
            {
                type: "checkbox",
                message: "Please select what you would like to implement",
                name: "features",
                loop: false,
                choices: [
                    {
                        name: "Events",
                        checked: true,
                    },
                    {
                        name: "Features",
                        checked: true,
                    },
                    {
                        name: "Slices",
                        checked: true,
                    },
                    {
                        name: "Translations",
                        checked: true,
                    },
                    {
                        name: "Models",
                        checked: true,
                    },
                    {
                        name: "View",
                        checked: true,
                    },
                    {
                        name: "Collections",
                        checked: true,
                    },
                    {
                        name: "Data Managers",
                        checked: true,
                    },
                ],
            },
        ])
            .then(function (answers) {
            var implementMembers = {
                implements: {},
            };
            if (answers.features.includes("Events")) {
                implementMembers.implements.events = true;
            }
            if (answers.features.includes("Features")) {
                implementMembers.implements.features = true;
            }
            if (answers.features.includes("Slices")) {
                implementMembers.implements.slices = true;
            }
            if (answers.features.includes("Translations")) {
                implementMembers.implements.translations = true;
            }
            if (answers.features.includes("Models")) {
                implementMembers.implements.models = true;
            }
            if (answers.features.includes("View")) {
                implementMembers.implements.view = true;
            }
            if (answers.features.includes("Collections")) {
                implementMembers.implements.collections = true;
            }
            if (answers.features.includes("Data Managers")) {
                implementMembers.implements.dataManagers = true;
            }
            resolve(implementMembers);
        });
    });
};
var createFeature = function (data) {
    return new Promise(function (resolve) { return __awaiter(void 0, void 0, void 0, function () {
        var project, newFeatureFileName, newProperties;
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __generator(this, function (_j) {
            try {
                project = project_1.getProject();
                newFeatureFileName = data.path + "/" + data.name + ".ts";
                project.addSourceFileAtPath(__dirname + "../../../../src/templates/NewFeature.ts");
                newProperties = {};
                if (data.implements) {
                    if ((_a = data.implements) === null || _a === void 0 ? void 0 : _a.features) {
                        newProperties.features = {
                            name: "features",
                            type: "Record<string, IFeature>",
                            isStatic: false,
                            initializer: "{}",
                        };
                    }
                    if ((_b = data.implements) === null || _b === void 0 ? void 0 : _b.slices) {
                        newProperties.slices = {
                            name: "slices",
                            type: "Record<string, Slice>",
                            isStatic: false,
                            initializer: "{}",
                        };
                    }
                    if ((_c = data.implements) === null || _c === void 0 ? void 0 : _c.translations) {
                        newProperties.translations = {
                            name: "translations",
                            type: "TranslationType",
                            isStatic: false,
                            initializer: "{}",
                        };
                    }
                    if ((_d = data.implements) === null || _d === void 0 ? void 0 : _d.events) {
                        newProperties.events = {
                            name: "events",
                            type: "Record<string, IEvent<unknown>>",
                            isStatic: false,
                            initializer: "{}",
                        };
                    }
                    if ((_e = data.implements) === null || _e === void 0 ? void 0 : _e.view) {
                        newProperties.view = {
                            name: "view",
                            type: "IView<unknown> | null",
                            isStatic: false,
                            initializer: "null",
                        };
                    }
                    if ((_f = data.implements) === null || _f === void 0 ? void 0 : _f.collections) {
                        newProperties.collections = {
                            name: "collections",
                            type: "Record<string, IDataCollection<unknown, unknown>>",
                            isStatic: false,
                            initializer: "{}",
                        };
                    }
                    if ((_g = data.implements) === null || _g === void 0 ? void 0 : _g.dataManagers) {
                        newProperties.dataManagers = {
                            name: "dataManagers",
                            type: "Record<string, IDataManager<unknown>>",
                            isStatic: false,
                            initializer: "{}",
                        };
                    }
                    if ((_h = data.implements) === null || _h === void 0 ? void 0 : _h.models) {
                        newProperties.models = {
                            name: "models",
                            type: "Record<string, IModel<unknown>>",
                            isStatic: false,
                            initializer: "{}",
                        };
                    }
                }
                common_1.transformFile(project, newFeatureFileName, {
                    fileName: "NewFeature.ts",
                    classesMap: {
                        NewFeature: {
                            name: data.name + "Feature",
                            existingProperties: {
                                name: data.name + "Feature",
                            },
                            newProperties: newProperties,
                        },
                    },
                    typesMap: {
                        NewFeatureConfig: data.name + "FeatureConfig",
                    },
                })
                    .then(function (result) { return resolve(result); })
                    .catch(function (e) {
                    console.log(chalk_1.default.red.bold(e));
                    resolve(false);
                });
            }
            catch (e) {
                console.log(chalk_1.default.red.bold(e));
                resolve(false);
            }
            return [2 /*return*/];
        });
    }); });
};
exports.default = (function (data, path) {
    return new Promise(function (resolve) { return __awaiter(void 0, void 0, void 0, function () {
        var pathToSave;
        return __generator(this, function (_a) {
            data = __assign(__assign({}, defaultData), data);
            pathToSave = path_1.getPath("Features/" + data.name);
            if (path) {
                pathToSave = path_1.getPath(path);
            }
            console.log(chalk_1.default.white.bold("Crafting a new feature. Answer a few questions, please.\r\n"));
            inquirer_1.default
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
                {
                    type: "list",
                    name: "implements",
                    message: "Which members to implement?",
                    choices: ["All", "Custom"],
                },
            ])
                .then(function (answers) {
                data.path = answers.path;
                data.name = answers.name;
                if (answers.implements === "Custom") {
                    return getCustomSettings();
                }
                else {
                    return new Promise(function (resolve) {
                        resolve({
                            implements: data.implements,
                        });
                    });
                }
            })
                .then(function (answers) {
                data = __assign(__assign({}, data), { implements: __assign({}, answers === null || answers === void 0 ? void 0 : answers.implements) });
                createFeature(data).then(function (res) {
                    resolve(res);
                });
            });
            return [2 /*return*/];
        });
    }); });
});
//# sourceMappingURL=createFeature.js.map