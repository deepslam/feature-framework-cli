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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@feature-framework/core");
var Feature = /** @class */ (function (_super) {
    __extends(Feature, _super);
    function Feature() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "NewFeature";
        return _this;
    }
    Feature.prototype.initFeature = function () {
        return new Promise(function (resolve) { return resolve(true); });
    };
    return Feature;
}(core_1.Feature));
exports.default = Feature;
//# sourceMappingURL=feature.js.map