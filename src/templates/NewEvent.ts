import { Event } from '@feature-framework/core';

// Implement model fields type here
export type NewEventCallbackType = unknown;

export default class NewEvent extends Event<NewEventCallbackType> {
  public readonly events = {};
}
