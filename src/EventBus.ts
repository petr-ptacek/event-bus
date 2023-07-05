/*
* The Map object holds key-value pairs and remembers the original insertion order of the keys.
* Any value (both objects and primitive values) may be used as either a key or a value.
* */

export type Ctx = {
  once: boolean;
}
export type EventType = string | symbol;
export type EventHandler = (...args: any) => void;

export type RecordEvents = Record<EventType, EventHandler>;

export type StoreItem<TKey> = Map<TKey, { handler: TKey, ctx: Ctx }>;

export type Store<TEvents extends RecordEvents> =
  Map<
    keyof TEvents,
    StoreItem<TEvents[keyof TEvents]>
  >;

export class EventBus<Events extends RecordEvents = any> {
  #eventsStore: Store<Events> = new Map();

  #on<TType extends keyof Events, THandler extends Events[TType]>(type: TType, handler: THandler, ctx: Ctx): void {
    const storeItem: StoreItem<THandler> = this.#eventsStore.get(type) ?? new Map;

    if ( storeItem.has(handler) ) {
      // storeItem.get(handler)!.ctx = ctx;
      return;
    }

    storeItem.set(
      handler, {
        handler,
        ctx
      }
    );

    this.#eventsStore.set(type, storeItem);
  }

  on<TType extends keyof Events, THandler extends Events[TType]>(type: TType, handler: THandler): void {
    this.#on(type, handler, { once: false });
  }

  once<TType extends keyof Events, THandler extends Events[TType]>(type: TType, handler: THandler): void {
    this.#on(type, handler, { once: true });
  }

  emit<TType extends keyof Events>(type: TType, ...args: Parameters<Events[TType]>) {
    if ( !this.#eventsStore.has(type) ) {
      return;
    }

    const storeItem = this.#eventsStore.get(type)!;

    for ( const entry of Array.from(storeItem.values()) ) {
      const { ctx, handler } = entry;
      handler(...Array.from(args));

      if ( ctx.once ) {
        this.off(type, handler);
      }
    }
  }

  off<TType extends keyof Events>(type: TType, handler?: Events[TType]) {
    if ( !this.#eventsStore.has(type) ) {
      return;
    }

    if ( handler ) {
      const storeItem = this.#eventsStore.get(type)!!;
      storeItem.delete(handler);

      if ( storeItem.size === 0 ) {
        this.#eventsStore.delete(type);
      } else {
        this.#eventsStore.set(type, storeItem);
      }
    } else {
      this.#eventsStore.delete(type);
    }
  }
}
