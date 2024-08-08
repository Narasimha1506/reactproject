import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './App.css';

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data));
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2 className="modal-title">{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} className="modal-image" />
      <p><strong>Instructions:</strong> {recipe.instructions}</p>
      <ul className="modal-ingredients">
        <strong>Ingredients:</strong>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <p><strong>Rating:</strong> {recipe.rating}</p>
      <p><strong>Review Count:</strong> {recipe.reviewCount}</p>
      <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
      <p><strong>Meal Type:</strong> {recipe.mealType}</p>
      <p><strong>Cooking Minutes:</strong> {recipe.cookingMinutes}</p>
      <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
      <Link to="/" className="modal-close-button">
        Back to Recipes
      </Link>
    </div>
  );
}

export default RecipeDetails;
