import { Event } from "@feature-framework/core";

// Implement model fields type here
export type NewEventCallbackType = {};

export default class NewEvent extends Event<NewEventCallbackType> {
  public readonly events = {};
}
