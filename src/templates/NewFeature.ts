import {
  Feature,
  IFeature,
  IView,
  IDataCollection,
  IDataManager,
  IEvent,
  IModel,
  Translations,
} from "@feature-framework/core";

// Feature config type here
type NewFeatureConfig = {};

export default class NewFeature
  extends Feature<NewFeatureConfig>
  implements IFeature<NewFeatureConfig> {
  name = "NewFeature";

  initFeature() {
    return new Promise((resolve) => resolve(true)) as Promise<boolean>;
  }
}
