import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Axios from "axios";
/* COMPONENTS */
import CreateNewForm from "./components/CreateNewForm";
import RecipeCard from "./components/RecipeCard";

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function go() {
      const response = await Axios.get("/api/recipes");
      setRecipes(response.data);
    }
    go();
  }, []);

  return (
    <div className="container">
      <h1>ADMIN</h1>
      <p>
        <a href="/">&laquo; Back to homepage</a>
      </p>
      <CreateNewForm setRecipes={setRecipes} />
      <div className="recipe-grid">
        {recipes.map(function (recipe) {
          return <RecipeCard key={recipe._id} name={recipe.name} type={recipe.type} photo={recipe.photo} id={recipe._id} setRecipes={setRecipes} />;
        })}
      </div>
    </div>
  );
}

const root = createRoot(document.querySelector("#app"));
root.render(<App />);
