import { Factory } from "@feature-framework/core";
import Product from "../Models/Product";

export default class ProductsFactory extends Factory<typeof Product> {
  public readonly model: typeof Product = Product;
}
