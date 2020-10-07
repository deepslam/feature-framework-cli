"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@feature-framework/core");
var NewModel_1 = __importDefault(require("./NewModel"));
var NewDataManager = /** @class */ (function (_super) {
    __extends(NewDataManager, _super);
    function NewDataManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.provider = new core_1.DefaultDataProvider();
        return _this;
    }
    NewDataManager.prototype.restore = function (data) {
        var obj = JSON.parse(data);
        return new NewModel_1.default(obj);
    };
    NewDataManager.prototype.pack = function (data) {
        return JSON.stringify(data);
    };
    return NewDataManager;
}(core_1.DataManager));
exports.default = NewDataManager;
//# sourceMappingURL=NewDataManager.js.map