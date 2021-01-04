import { Feature, IFeature, IApp, FeatureCommonType } from '@feature-framework/core';

type NewFeatureType = FeatureCommonType;

export default class NewFeature
  extends Feature<NewFeatureType, IApp<any>>
  implements IFeature<NewFeatureType, IApp<any>> {
  name = 'NewFeature';

  initFeature() {
    return new Promise((resolve) => resolve(true)) as Promise<boolean>;
  }
}
