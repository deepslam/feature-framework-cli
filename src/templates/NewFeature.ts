import { Feature, IFeature, IApp } from "@feature-framework/core";

// Feature config type here
type NewFeatureConfigType = {};
type NewFeatureSubFeaturesType = {};

export default class NewFeature
  extends Feature<NewFeatureConfigType, IApp, NewFeatureSubFeaturesType>
  implements IFeature<NewFeatureConfigType, IApp> {
  name = "NewFeature";

  initFeature() {
    return new Promise((resolve) => resolve(true)) as Promise<boolean>;
  }
}
