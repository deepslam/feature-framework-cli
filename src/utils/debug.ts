import program from '../getProgram';

export function debug(msg: string): void {
  if (program.debug) console.log(`Debug: ${msg}`);
}
