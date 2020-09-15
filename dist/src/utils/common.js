"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveToFile = exports.readAndCompileTemplate = void 0;
var handlebars = require("handlebars");
var fs = require("fs");
exports.readAndCompileTemplate = function (path, data) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, function (err, content) {
            if (err)
                reject(err);
            resolve(renderToString(content, data));
        });
    });
};
exports.saveToFile = function (path, data) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(path, data, function (err) {
            if (err)
                reject(err);
            resolve(true);
        });
    });
};
// read the file and use the callback to render
// this will be called after the file is read
function renderToString(source, data) {
    var template = handlebars.compile(source);
    var outputString = template(data);
    return outputString;
}
//# sourceMappingURL=common.js.map