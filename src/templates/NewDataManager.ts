import { DataManager, DefaultDataProvider } from "@feature-framework/core";
import NewModel from "./NewModel";

export default class NewDataManager extends DataManager<NewModel> {
  public readonly provider: DefaultDataProvider = new DefaultDataProvider();

  protected restore(data: string): NewModel {
    const obj = JSON.parse(data);
    return new NewModel(obj);
  }
  protected pack(data: NewModel): string {
    return JSON.stringify(data);
  }
}
