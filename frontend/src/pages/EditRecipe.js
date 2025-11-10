import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditRecipe = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    cookingTime: '',
    difficulty: 'Medium',
    category: 'Dinner',
    ingredients: [{ name: '', quantity: '' }],
    instructions: ['']
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
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
      const recipe = res.data;
      
      setFormData({
        title: recipe.title,
        description: recipe.description,
        cookingTime: recipe.cookingTime.toString(),
        difficulty: recipe.difficulty,
        category: recipe.category,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions
      });
      setFetchLoading(false);
    } catch (err) {
      setError('Recipe not found');
      setFetchLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index][field] = value;
    setFormData({ ...formData, ingredients: updatedIngredients });
  };

  const handleInstructionChange = (index, value) => {
    const updatedInstructions = [...formData.instructions];
    updatedInstructions[index] = value;
    setFormData({ ...formData, instructions: updatedInstructions });
  };

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { name: '', quantity: '' }]
    });
  };

  const removeIngredient = (index) => {
    const updatedIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData({ ...formData, ingredients: updatedIngredients });
  };

  const addInstruction = () => {
    setFormData({
      ...formData,
      instructions: [...formData.instructions, '']
    });
  };

  const removeInstruction = (index) => {
    const updatedInstructions = formData.instructions.filter((_, i) => i !== index);
    setFormData({ ...formData, instructions: updatedInstructions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      const submitData = {
        ...formData,
        ingredients: formData.ingredients.filter(ing => ing.name.trim() !== ''),
        instructions: formData.instructions.filter(inst => inst.trim() !== ''),
        cookingTime: parseInt(formData.cookingTime)
      };

      await axios.put(`http://localhost:5000/api/recipes/${id}`, submitData, config);
      navigate(`/recipe/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update recipe');
    } finally {
      setSubmitLoading(false);
    }
  };

  if (fetchLoading) return <div className="loading">Loading recipe...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="form-page">
      <div className="form-container">
        <h1>Edit Recipe</h1>
        {error && <div className="error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Recipe Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Cooking Time (minutes) *</label>
              <input
                type="number"
                name="cookingTime"
                value={formData.cookingTime}
                onChange={handleChange}
                min="1"
                required
              />
            </div>

            <div className="form-group">
              <label>Difficulty</label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Dessert">Dessert</option>
                <option value="Snack">Snack</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
              </select>
            </div>
          </div>

          <div className="form-section">
            <div className="section-header">
              <h3>Ingredients</h3>
              <button type="button" onClick={addIngredient} className="btn btn-sm btn-outline">
                + Add Ingredient
              </button>
            </div>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="ingredient-row">
                <input
                  type="text"
                  placeholder="Ingredient name"
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Quantity"
                  value={ingredient.quantity}
                  onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                />
                {formData.ingredients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="btn btn-sm btn-danger"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="form-section">
            <div className="section-header">
              <h3>Instructions</h3>
              <button type="button" onClick={addInstruction} className="btn btn-sm btn-outline">
                + Add Step
              </button>
            </div>
            {formData.instructions.map((instruction, index) => (
              <div key={index} className="instruction-row">
                <div className="step-number">Step {index + 1}</div>
                <textarea
                  placeholder="Describe this step..."
                  value={instruction}
                  onChange={(e) => handleInstructionChange(index, e.target.value)}
                  rows="2"
                />
                {formData.instructions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeInstruction(index)}
                    className="btn btn-sm btn-danger"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          <button type="submit" className="btn btn-primary" disabled={submitLoading}>
            {submitLoading ? 'Updating Recipe...' : 'Update Recipe'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditRecipe;