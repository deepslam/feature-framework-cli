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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runPrettierOnFile = void 0;
var prettier_1 = __importDefault(require("prettier"));
var fs_1 = __importDefault(require("fs"));
var runPrettierOnFile = function (fileName) {
    var result = false;
    var prettierOptions = prettier_1.default.resolveConfig.sync(fileName);
    try {
        var input = fs_1.default.readFileSync(fileName, 'utf8');
        console.log("Formatting " + fileName);
        var output = prettier_1.default.format(input, __assign(__assign({}, prettierOptions), { filepath: fileName }));
        if (output !== input) {
            fs_1.default.writeFileSync(fileName, output, 'utf8');
        }
    }
    catch (error) {
        result = false;
        console.log("\n\n" + error.message);
        console.log(fileName);
    }
    return result;
};
exports.runPrettierOnFile = runPrettierOnFile;
//# sourceMappingURL=prettier.js.map