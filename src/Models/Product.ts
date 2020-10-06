import { Model } from "@feature-framework/core";

// Implement model fields type here
export type ProductFieldsType = {};

export default class Product extends Model<ProductFieldsType> {
  public readonly events = {};
}
