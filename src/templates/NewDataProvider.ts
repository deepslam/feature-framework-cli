/* eslint-disable @typescript-eslint/no-unused-vars */
import { IDataProvider } from '@feature-framework/core';

export default class NewDataProvider implements IDataProvider {
  load(key: string): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  remove(key: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  save(key: string, data: unknown): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
