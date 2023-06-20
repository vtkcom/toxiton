import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { StoreContext } from "storeon/react";
import { store } from "./store/index.ts";

ReactDOM.createRoot(document.querySelector("app") as HTMLElement).render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  </React.StrictMode>
);
