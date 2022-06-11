import { describe, expect, it } from "vitest";
import { act, renderHook } from "@testing-library/react-hooks";
import { createStore } from ".";
import * as rtl from "@testing-library/react";

describe("createStore", () => {
  const DemoStore = createStore({ count: 0 });
  it("useStore", () => {
    expect(typeof DemoStore.useStore).toBe("function");
  });

  it("Provider", () => {
    expect(() =>
      rtl.render(
        <DemoStore.Provider>
          <div />
        </DemoStore.Provider>
      )
    ).not.toThrow();
    //@ts-expect-error
    expect(() => rtl.render(<DemoStore.Provider />)).not.toThrow(
      /children with exactly one child/
    );
  });

  it("setStoreState", () => {
    const wrapper = ({ children }) => (
      <DemoStore.Provider>{children}</DemoStore.Provider>
    );
    const { result } = renderHook(() => DemoStore.useStore(), { wrapper });
    act(() => {
      result.current.setStoreState({ count: result.current.count + 1 });
    });
    expect(result.current.count).toBe(1);
  });
});
