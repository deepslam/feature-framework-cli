import { Model } from "@feature-framework/core";

// Implement model fields type here
export type NewModelFieldsType = {};

export default class NewModel extends Model<NewModelFieldsType> {
  public readonly events = {};
}
