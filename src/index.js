import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Axios from "axios";

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function go() {
      const response = await Axios.get("/api/recipes");
      setRecipes(response.data);
    }
  }, []);
  return (
    <div>
      <h1>Hey</h1>
      <p>This is REACT</p>
      {recipes.map(function (recipe) {
        return <RecipeCard name={recipe.name} type={recipe.type} />;
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
