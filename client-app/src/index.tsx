import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import "./app/layout/styles.css";
import App from "./app/layout/App";
import reportWebVitals from "./reportWebVitals";
import { store, StoreContext } from "./app/stores/store";

/*
// Will get the root element from index.html and render the app there.
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// <App /> puts in root the content in App.tsx (function App())
// Using strict mode will render twice
// Provide context to application
root.render(
  // <React.StrictMode>
    <App /> 
  // </React.StrictMode>
);*/

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
