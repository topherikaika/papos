import React from "react";
import { createRoot } from "react-dom/client";
import Axios from "axios";

function App() {
  const recipes = [];
  return (
    <div>
      <h1>Hey</h1>
      <p>This is REACT</p>
      {recipes.map(function (recipe) {
        return <AnimalCard name={recipe.name} type={recipe.type} />;
      })}
    </div>
  );
}

function RecipeCard(props) {
  return;
  <p>
    {props.name} e {props.type}
  </p>;
}

const root = createRoot(document.querySelector("#app"));
root.render(<App />);
