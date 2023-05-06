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

function RecipeCard(props) {
  return (
    <p>
      {props.name} e {props.type}
    </p>
  );
}

const root = createRoot(document.querySelector("#app"));
root.render(<App />);
