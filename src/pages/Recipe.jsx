import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import mealdbApi from "../mealdb-api";
import RecipeIngredients from "../components/RecipeIngredients";
import RecipeInstructions from "../components/RecipeInstructions";

const Recipe = ({ match }) => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    try {
      const recipe = await mealdbApi.getRecipe(match.params.recipeId);
      setRecipe(recipe);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      {loading ? (
        <div className="message">Cargando</div>
      ) : (
        <div className="Recipe">
          <Helmet>
            <title>{recipe.name}</title>
          </Helmet>

          <div
            className="hero"
            style={{ backgroundImage: `url(${recipe.thumbnail})` }}
          />

          <div className="title">
            <div className="info">
              <h1>{recipe.name}</h1>
              <p>{recipe.origin}</p>
            </div>
            <div></div>
          </div>

          <RecipeIngredients ingredients={recipe.ingredients} />

          <RecipeInstructions instructions={recipe.instructions} />
        </div>
      )}
    </>
  );
};

export default Recipe;
