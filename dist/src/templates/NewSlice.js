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
Object.defineProperty(exports, "__esModule", { value: true });
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {};
var slice = toolkit_1.createSlice({
    name: 'NewSlice',
    initialState: initialState,
    reducers: {
        update: function (state, action) { return (__assign(__assign({}, state), action.payload)); },
    },
});
exports.default = slice;
//# sourceMappingURL=NewSlice.js.map