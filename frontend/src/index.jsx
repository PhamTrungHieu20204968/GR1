import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./components/GlobalStyles/GlobalStyles";
import { ContextProvider } from "./contexts/ContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <GlobalStyles>
          <App />
        </GlobalStyles>
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
