import {
  Feature,
  IFeature,
  Factory,
  Translations,
  IEvent,
  IView,
  IDataCollection,
  IDataManager,
  IModel,
  IApp,
} from "@feature-framework/core";

// Feature config type here
type SuperFeatureConfigType = {};
type SuperFeatureFeaturesType = {};

export default class SuperFeature
  extends Feature<SuperFeatureConfigType, IApp, SuperFeatureFeaturesType>
  implements IFeature<SuperFeatureConfigType, IApp> {
  name = "SuperFeature";

  initFeature() {
    return new Promise((resolve) => resolve(true)) as Promise<boolean>;
  }

  features: Record<string, IFeature<any, any>> = {};
  factories: Record<string, Factory<any>> = {};
  translations: Record<string, Translations<unknown>> = {};
  events: Record<string, IEvent<unknown>> = {};
  view: IView<unknown> | null = null;
  collections: Record<string, IDataCollection<unknown>> = {};
  dataManagers: Record<string, IDataManager<unknown>> = {};
  models: Record<string, IModel<unknown>> = {};
}
