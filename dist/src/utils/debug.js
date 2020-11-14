"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.debug = void 0;
var getProgram_1 = __importDefault(require("../getProgram"));
function debug(msg) {
    if (getProgram_1.default.debug)
        console.log("Debug: " + msg);
}
exports.debug = debug;
//# sourceMappingURL=debug.js.map