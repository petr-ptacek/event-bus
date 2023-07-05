# Event Bus

- inspiration with the Vue2 `event-bus pattern`

## Usage

```shell
npm i --save @petr-ptacek/event-bus
```

```ts
import { EventBus } from "@petr-ptacek/event-bus";

const eb = new EventBus<{
  sum: (a: number, b: number) => void;
}>();

eb.on("sum", (a, b) => {
  console.log(`recieved: ${ a } ${ b }`);
});

eb.emit("sum", 1, 2);
```

## Methods

### on

Called when the event type is emitted.

```ts
interface OnFn {
  (type: string, handler: Function);
}

const eb = new EventBus();

eb.on("sum", (...args) => {
  /*...*/
});
```

### once

Called only once, then the handler is unregistered.

```ts
interface OnceFn {
  (type: string, handler: Function);
}


const eb = new EventBus();

eb.once("sum", (...args) => {
  /*...*/
});
```

### off

Unregister handler/s. If the handler reference is not provided, unregister all handlers by that type.

```ts
interface OffFn {
  (type: string, handler?: Function);
}

function sum(a: number, b: number) {

}

const eb = new EventBus();

eb.off("sum", sum);
```

### emit

Emit the correct type with provided arguments.

```ts
interface EmitFn {
    (type: string, ...args: any[]);
}

function sum(a: number, b: number) {

}

const eb = new EventBus();

eb.on("sum", sum);
eb.emit("sum", 1, 1);
```
