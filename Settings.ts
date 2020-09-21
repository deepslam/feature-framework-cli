import { Feature, IFeature } from "@feature-framework/core";

type SettingsFeatureConfig = {};

export default class SettingsFeature
  extends Feature<SettingsFeatureConfig>
  implements IFeature<SettingsFeatureConfig> {
  name = 'SettingsFeature';

  initFeature() {
    return new Promise((resolve) => resolve(true)) as Promise<boolean>;
  }

    features: Record<string, IFeature> = {};
    events: Record<string, IFeature> = {};
    collections: Record<string, IFeature> = {};
    dataManagers: Record<string, IFeature> = {};
    models: Record<string, IFeature> = {};
}
