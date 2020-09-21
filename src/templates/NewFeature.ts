import { Feature, IFeature } from "@feature-framework/core";

type NewFeatureConfig = {};

export default class NewFeature
  extends Feature<NewFeatureConfig>
  implements IFeature<NewFeatureConfig> {
  name = "NewFeature";

  initFeature() {
    return new Promise((resolve) => resolve(true)) as Promise<boolean>;
  }
}
