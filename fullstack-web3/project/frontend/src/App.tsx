//node_modules
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

//routes
import AppRoutes from "./AppRoutes";

//stores
import { store } from "./redux/store.js";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
