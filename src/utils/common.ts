var handlebars = require("handlebars");
var fs = require("fs");

export const readAndCompileTemplate = (
  path: string,
  data: unknown
): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, function (err: string, content: string) {
      if (err) reject(err);
      resolve(renderToString(content, data));
    });
  });
};

export const saveToFile = (path: string, data: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err: string) => {
      if (err) reject(err);

      resolve(true);
    });
  });
};

// read the file and use the callback to render

// this will be called after the file is read
function renderToString(source: string, data: unknown) {
  var template = handlebars.compile(source);
  var outputString = template(data);
  return outputString;
}
