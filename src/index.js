import React from "react";
import { createRoot } from "react-dom/client";

function App() {
  return (
    <div>
      <h1>Hey</h1>
      <p>This is REACT</p>
    </div>
  );
}

const root = createRoot(document.querySelector("#app"));
root.render(<App />);
