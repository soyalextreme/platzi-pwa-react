import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import mealdb from "../mealdb-api";

const Home = () => {
  const [recipes, setRecipes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    try {
      const recipes = await mealdb.getLatest();
      setRecipes(recipes);
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
        <>
          <Helmet>
            <title>Recetas</title>
          </Helmet>

          <div className="recipes">
            {recipes &&
              recipes.map((recipe) => (
                <Link
                  to={`/recipe/${recipe.id}`}
                  className="recipe"
                  key={recipe.id}
                >
                  <span
                    className="bg"
                    style={{ backgroundImage: `url(${recipe.thumbnail})` }}
                  ></span>
                  <span className="info">
                    <h2>{recipe.name}</h2>
                  </span>
                </Link>
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
