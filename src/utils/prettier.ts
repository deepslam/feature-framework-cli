import prettier from 'prettier';
import fs from 'fs';

export const runPrettierOnFile = (fileName: string): boolean => {
  let result = false;
  const prettierOptions = prettier.resolveConfig.sync(fileName);

  try {
    const input = fs.readFileSync(fileName, 'utf8');
    console.log(`Formatting ${fileName}`);
    const output = prettier.format(input, {
      ...prettierOptions,
      filepath: fileName,
    });
    if (output !== input) {
      fs.writeFileSync(fileName, output, 'utf8');
    }
  } catch (error) {
    result = false;
    console.log(`\n\n${error.message}`);
    console.log(fileName);
  }

  return result;
};
