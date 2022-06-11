import React from "react";
import ReactDOM from "react-dom";
import { createStore } from ".";

const DemoStore = createStore({ count: 0 });
const App = () => {
  const { setStoreState, count } = DemoStore.useStore();
  return (
    <button onClick={() => setStoreState({ count: count + 1 })}>{count}</button>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <DemoStore.Provider>
      <App />
    </DemoStore.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
