import { AppCommonType , IApp, Application } from '@feature-framework/core';

export type NewAppType = AppCommonType;

export default class NewApp
  extends Application<NewAppType>
  implements IApp<NewAppType> {
}
