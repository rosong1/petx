# petx

An easy-to-use state management in React

try it in [stackblitz](https://stackblitz.com/edit/vitejs-vite-og47k3?file=src%2FApp.tsx)

## quick start

```bash
npm install petx
```

```ts
import { createStore } from "petx";
const CounterStore = createStore({ count: 0 });

const Counter = () => {
  const { count, setStoreState } = CounterStore.useStore();
  return (
    <button type="button" onClick={() => setStoreState({ count: count + 1 })}>
      count from CounterStore is: {count}
    </button>
  );
};
const Double = () => {
  const { count } = CounterStore.useStore();
  return <button type="button">{count * 2}</button>;
};
const Wrap = () => {
  return (
    <>
      <p>Hello petx + React!</p>
      <Counter />
      <Double />
    </>
  );
};
const App = () => {
  return (
    <CounterStore.Provider>
      <Wrap />
    </CounterStore.Provider>
  );
};
```
