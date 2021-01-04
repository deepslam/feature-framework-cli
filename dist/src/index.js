#!/usr/bin/env node
"use strict";
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
var getProgram_1 = __importDefault(require("./getProgram"));
var greeting_1 = __importDefault(require("./greeting"));
var createApp_1 = __importDefault(require("./commands/createApp"));
var createFeature_1 = __importDefault(require("./commands/createFeature"));
var createEvent_1 = __importDefault(require("./commands/createEvent"));
var createModel_1 = __importDefault(require("./commands/createModel"));
var createCollection_1 = __importDefault(require("./commands/createCollection"));
var createDataProvider_1 = __importDefault(require("./commands/createDataProvider"));
var createDataManager_1 = __importDefault(require("./commands/createDataManager"));
var createTranslation_1 = __importDefault(require("./commands/createTranslation"));
var createFactory_1 = __importDefault(require("./commands/createFactory"));
var createView_1 = __importDefault(require("./commands/createView"));
var log = console.log;
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = log;
                return [4 /*yield*/, greeting_1.default()];
            case 1:
                _a.apply(void 0, [_b.sent()]);
                try {
                    getProgram_1.default.version('', '-v', 'output the current CLI version');
                    getProgram_1.default
                        .command('new:app <name> [path]')
                        .description('define a new app')
                        .action(function (name, path) {
                        createApp_1.default({
                            name: name,
                        }, path).then(function (result) {
                            log(result
                                ? chalk_1.default.green.bold('App successfully created')
                                : chalk_1.default.red.bold('App was not created due to the error'));
                        });
                    });
                    getProgram_1.default
                        .command('new:feature <name> [path]')
                        .description('define a new feature')
                        .action(function (name, path) {
                        createFeature_1.default({
                            name: name,
                        }, path).then(function (result) {
                            log(result
                                ? chalk_1.default.green.bold('Feature successfully created')
                                : chalk_1.default.red.bold('Feature was not created due to the error'));
                        });
                    });
                    getProgram_1.default
                        .command('new:model <name> [path]')
                        .description('define a new model')
                        .action(function (name, path) {
                        createModel_1.default({
                            name: name,
                        }, path).then(function (result) {
                            log(result
                                ? chalk_1.default.green.bold('Model successfully created')
                                : chalk_1.default.red.bold('Model was not created due to the error'));
                        });
                    });
                    getProgram_1.default
                        .command('new:event <name> [path]')
                        .description('define a new event')
                        .action(function (name, path) {
                        createEvent_1.default({
                            name: name,
                        }, path).then(function (result) {
                            log(result
                                ? chalk_1.default.green.bold('Event successfully created')
                                : chalk_1.default.red.bold('Event was not created due to the error'));
                        });
                    });
                    getProgram_1.default
                        .command('new:provider <name> [path]')
                        .description('define a new data provider')
                        .action(function (name, path) {
                        createDataProvider_1.default({
                            name: name,
                        }, path).then(function (result) {
                            log(result
                                ? chalk_1.default.green.bold('Data provider successfully created')
                                : chalk_1.default.red.bold('Data provider was not created due to the error'));
                        });
                    });
                    getProgram_1.default
                        .command('new:manager <name> <model> [path]')
                        .description('define a new data manager')
                        .action(function (name, model, path) {
                        createDataManager_1.default({
                            name: name,
                            model: model,
                        }, path).then(function (result) {
                            log(result
                                ? chalk_1.default.green.bold('Data manager successfully created')
                                : chalk_1.default.red.bold('Data manager was not created due to the error'));
                        });
                    });
                    getProgram_1.default
                        .command('new:collection <name> <model> [path]')
                        .description('define a new collection')
                        .action(function (name, model, path) {
                        createCollection_1.default({
                            name: name,
                            model: model,
                        }, path).then(function (result) {
                            log(result
                                ? chalk_1.default.green.bold('Collection successfully created')
                                : chalk_1.default.red.bold('Collection was not created due to the error'));
                        });
                    });
                    getProgram_1.default
                        .command('new:factory <name> <model> [path]')
                        .description('define a new factory')
                        .action(function (name, model, path) {
                        createFactory_1.default({
                            name: name,
                            model: model,
                        }, path).then(function (result) {
                            log(result
                                ? chalk_1.default.green.bold('Factory successfully created')
                                : chalk_1.default.red.bold('Factory was not created due to the error'));
                        });
                    });
                    getProgram_1.default
                        .command('new:translations <name> [path]')
                        .description('define a new translations file')
                        .action(function (name, path) {
                        createTranslation_1.default({
                            name: name,
                        }, path).then(function (result) {
                            log(result
                                ? chalk_1.default.green.bold('Translations successfully created')
                                : chalk_1.default.red.bold('Translations were not created due to the error'));
                        });
                    });
                    getProgram_1.default
                        .command('new:view <name> [path]')
                        .description('define a new view file')
                        .action(function (name, path) {
                        createView_1.default({
                            name: name,
                        }, path).then(function (result) {
                            log(result
                                ? chalk_1.default.green.bold('Translations successfully created')
                                : chalk_1.default.red.bold('Translations were not created due to the error'));
                        });
                    });
                    getProgram_1.default.option('-d, --debug', 'output extra debugging');
                    getProgram_1.default.parse(process.argv);
                }
                catch (e) {
                    log(chalk_1.default.red.bold("Error happened during the execution: " + e));
                }
                return [2 /*return*/];
        }
    });
}); })();
//# sourceMappingURL=index.js.map