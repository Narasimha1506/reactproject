import React, { useEffect, useState } from 'react';
import './styles/App.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchRecipes(currentPage);
  }, [currentPage]);

  const fetchRecipes = (page) => {
    fetch(`https://dummyjson.com/recipes?limit=6&skip=${(page - 1) * 6}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data.recipes);
        setTotalPages(Math.ceil(data.total / 6));
      });
  };

  const fetchRecipeDetails = (id) => {
    fetch(`https://dummyjson.com/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedRecipe(data);
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = () => {
    fetch(`https://dummyjson.com/recipes/search?q=${searchQuery}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.recipes.length > 0) {
          setRecipes(data.recipes);
          setTotalPages(1);
          setCurrentPage(1);
        } else {
          alert('No recipes found');
        }
      });
  };

  const addToCart = (recipe) => {
    setCart([...cart, recipe]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div className="container">
      <h1 className="title">Recipes</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a recipe..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>
      {cart.length > 0 && (
        <div className="cart">
          <h2 className="cart-title">Cart Items</h2>
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <span>{item.title}</span>
                <button onClick={() => removeFromCart(item.id)} className="remove-button">Remove</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="grid">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="card">
            <img src={recipe.image} alt={recipe.title} className="card-image" />
            <div className="card-content">
              <h2 className="card-title">{recipe.title}</h2>
              <div className="button-container">
                <button
                  onClick={() => fetchRecipeDetails(recipe.id)}
                  className="card-button"
                >
                  Know More
                </button>
                <button
                  onClick={() => addToCart(recipe)}
                  className="card-button"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      {selectedRecipe && (
        <div className="modal-overlay" onClick={() => setSelectedRecipe(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">{selectedRecipe.title}</h2>
            <img src={selectedRecipe.image} alt={selectedRecipe.title} className="modal-image" />
            <p><strong>Instructions:</strong> {selectedRecipe.instructions}</p>
            <ul className="modal-ingredients">
              <strong>Ingredients:</strong>
              {selectedRecipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <p><strong>Rating:</strong> {selectedRecipe.rating}</p>
            <p><strong>Review Count:</strong> {selectedRecipe.reviewCount}</p>
            <p><strong>Difficulty:</strong> {selectedRecipe.difficulty}</p>
            <p><strong>Meal Type:</strong> {selectedRecipe.mealType}</p>
            <p><strong>Cooking Minutes:</strong> {selectedRecipe.cookingMinutes}</p>
            <p><strong>Cuisine:</strong> {selectedRecipe.cuisine}</p>
            <button
              onClick={() => setSelectedRecipe(null)}
              className="modal-close-button"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
