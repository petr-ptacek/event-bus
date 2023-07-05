import { afterEach, beforeEach, describe, expect, it, type Mock, vi } from "vitest";
import { EventBus }                                                   from ":event-bus";

type EventBusTypes = {
  sum: (a: number, b: number) => number;
};

let eb: EventBus<EventBusTypes> = new EventBus();
let spySum: Mock = vi.fn();

describe("EventBus", () => {

  beforeEach(() => {
    eb = new EventBus();

    spySum = vi.fn();
    spySum.mockImplementation((a, b) => a + b);
  });

  afterEach(() => {
    spySum.mockReset();
  });

  it("Provided handler was called with arguments", () => {
    eb.on("sum", spySum);

    eb.emit("sum", 1, 1);

    expect(spySum).toBeCalledTimes(1);
    expect(spySum).toBeCalledWith(1, 1);
  });

  it("Provided handler was called only once", () => {

    eb.once("sum", spySum);

    eb.emit("sum", 1, 1);
    expect(spySum).toBeCalledTimes(1);

    eb.emit("sum", 2, 2);
    expect(spySum).toBeCalledTimes(1);
  });

  it("Remove provided handler", () => {
    eb.on("sum", spySum);

    eb.emit("sum", 1, 1);
    expect(spySum).toBeCalledTimes(1);

    eb.off("sum", spySum);
    expect(spySum).toBeCalledTimes(1);
  });

  it("Register same handlers only once", () => {
    eb.on("sum", spySum);
    eb.on("sum", spySum);

    eb.emit("sum", 1, 2);

    expect(spySum).toBeCalledTimes(1);
  });
});
