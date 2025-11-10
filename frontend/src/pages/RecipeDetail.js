import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchRecipe = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const res = await axios.get(`http://localhost:5000/api/recipes/${id}`, config);
      setRecipe(res.data);
      setLoading(false);
    } catch (err) {
      setError('Recipe not found');
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);

  const deleteRecipe = async () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        await axios.delete(`http://localhost:5000/api/recipes/${id}`, config);
        navigate('/recipes');
      } catch (err) {
        setError('Failed to delete recipe');
      }
    }
  };

  if (loading) return <div className="loading">Loading recipe...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!recipe) return <div className="error">Recipe not found</div>;

  return (
    <div className="recipe-detail">
      <div className="recipe-header">
        <div className="header-actions">
          <Link to="/recipes" className="btn btn-outline">← Back to Recipes</Link>
          <div className="action-buttons">
            <Link to={`/edit-recipe/${recipe._id}`} className="btn btn-primary">
              Edit Recipe
            </Link>
            <button onClick={deleteRecipe} className="btn btn-danger">
              Delete Recipe
            </button>
          </div>
        </div>
        
        <h1>{recipe.title}</h1>
        <p className="recipe-description">{recipe.description}</p>
        
        <div className="recipe-meta-grid">
          <div className="meta-item">
            <span className="meta-label">Cooking Time</span>
            <span className="meta-value">⏱️ {recipe.cookingTime} minutes</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Difficulty</span>
            <span className="meta-value">📊 {recipe.difficulty}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Category</span>
            <span className="meta-value">🏷️ {recipe.category}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Created</span>
            <span className="meta-value">📅 {new Date(recipe.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="recipe-content">
        <div className="ingredients-section">
          <h2>Ingredients</h2>
          <ul className="ingredients-list">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="ingredient-item">
                <span className="ingredient-name">{ingredient.name}</span>
                <span className="ingredient-quantity">{ingredient.quantity}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="instructions-section">
          <h2>Instructions</h2>
          <ol className="instructions-list">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="instruction-item">
                {instruction}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;