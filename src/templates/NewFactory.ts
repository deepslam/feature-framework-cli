import { Factory } from "@feature-framework/core";
import NewModel from "./NewModel";

export default class NewFactory extends Factory<typeof NewModel> {
  public readonly model: typeof NewModel = NewModel;
}
