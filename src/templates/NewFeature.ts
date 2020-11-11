import { Feature, IFeature, IApp, ConfigType } from '@feature-framework/core';

// Feature config type here
type NewFeatureConfigType = Record<string, ConfigType>;
type NewFeatureSubFeaturesType = Record<string, IFeature<any, any>>;

export default class NewFeature
  extends Feature<NewFeatureConfigType, IApp, NewFeatureSubFeaturesType>
  implements IFeature<NewFeatureConfigType, IApp> {
  name = 'NewFeature';

  initFeature() {
    return new Promise((resolve) => resolve(true)) as Promise<boolean>;
  }
}
