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
var NewEvent = /** @class */ (function (_super) {
    __extends(NewEvent, _super);
    function NewEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NewEvent;
}(core_1.Event));
exports.default = NewEvent;
//# sourceMappingURL=NewEvent.js.map