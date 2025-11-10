import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const res = await axios.get('http://localhost:5000/api/recipes', config);
      setRecipes(res.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch recipes');
      setLoading(false);
    }
  };

  const deleteRecipe = async (id) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        await axios.delete(`http://localhost:5000/api/recipes/${id}`, config);
        setRecipes(recipes.filter(recipe => recipe._id !== id));
      } catch (err) {
        setError('Failed to delete recipe');
      }
    }
  };

  if (loading) return <div className="loading">Loading your recipes...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="recipes-page">
      <div className="page-header">
        <h1>My Recipes</h1>
        <Link to="/add-recipe" className="btn btn-primary">
          + Add New Recipe
        </Link>
      </div>

      {recipes.length === 0 ? (
        <div className="empty-state">
          <h2>No recipes yet!</h2>
          <p>Start by adding your first recipe.</p>
          <Link to="/add-recipe" className="btn btn-primary">
            Create Your First Recipe
          </Link>
        </div>
      ) : (
        <div className="recipes-grid">
          {recipes.map(recipe => (
            <div key={recipe._id} className="recipe-card">
              <div className="recipe-image">
                {recipe.image ? (
                  <img src={recipe.image} alt={recipe.title} />
                ) : (
                  <div className="recipe-image-placeholder">
                    🍳
                  </div>
                )}
              </div>
              <div className="recipe-content">
                <h3>{recipe.title}</h3>
                <p className="recipe-description">{recipe.description}</p>
                <div className="recipe-meta">
                  <span className="cooking-time">⏱️ {recipe.cookingTime} min</span>
                  <span className="difficulty">📊 {recipe.difficulty}</span>
                  <span className="category">🏷️ {recipe.category}</span>
                </div>
                <div className="recipe-actions">
                  <Link to={`/recipe/${recipe._id}`} className="btn btn-sm btn-outline">
                    View
                  </Link>
                  <Link to={`/edit-recipe/${recipe._id}`} className="btn btn-sm btn-outline">
                    Edit
                  </Link>
                  <button 
                    onClick={() => deleteRecipe(recipe._id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recipes;