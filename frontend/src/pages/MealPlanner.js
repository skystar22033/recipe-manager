import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Helper function for category emojis
const getCategoryEmoji = (category) => {
  const emojis = {
    Breakfast: '🍳',
    Lunch: '🥪',
    Dinner: '🍝',
    Dessert: '🍰',
    Snack: '🍎',
    Vegetarian: '🥦',
    Vegan: '🌱',
    Italian: '🍕',
    Mexican: '🌮',
    Asian: '🍜',
    Indian: '🍛'
  };
  return emojis[category] || '🍽️';
};

// Meal Planner Component
const MealPlanner = () => {
  const [mealPlan, setMealPlan] = useState(null);
  const [userRecipes, setUserRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showRecipeBrowser, setShowRecipeBrowser] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Days and meal types
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const dayNames = {
    monday: 'Monday', tuesday: 'Tuesday', wednesday: 'Wednesday',
    thursday: 'Thursday', friday: 'Friday', saturday: 'Saturday', sunday: 'Sunday'
  };
  const mealTypes = ['breakfast', 'lunch', 'dinner'];
  const mealIcons = { breakfast: '🌅', lunch: '☀️', dinner: '🌙' };

  // Fetch meal plan and user recipes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        // Fetch current meal plan
        const mealPlanRes = await axios.get('http://localhost:5000/api/mealplans/current', config);
        setMealPlan(mealPlanRes.data);

        // Fetch user's recipes - FIXED: Using correct endpoint
        const recipesRes = await axios.get('http://localhost:5000/api/recipes', config);
        setUserRecipes(recipesRes.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle recipe assignment
  const assignRecipe = async (day, mealType, recipeId) => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      const res = await axios.put(
        `http://localhost:5000/api/mealplans/${mealPlan._id}`,
        { day, mealType, recipeId },
        config
      );

      setMealPlan(res.data);
      setShowRecipeBrowser(false);
      setSelectedSlot(null);
    } catch (error) {
      console.error('Error assigning recipe:', error);
      alert('Error assigning recipe. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Handle recipe removal
  const removeRecipe = async (day, mealType) => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      const res = await axios.put(
        `http://localhost:5000/api/mealplans/${mealPlan._id}`,
        { day, mealType, recipeId: null },
        config
      );

      setMealPlan(res.data);
    } catch (error) {
      console.error('Error removing recipe:', error);
    } finally {
      setSaving(false);
    }
  };

  // Open recipe browser for a specific slot
  const openRecipeBrowser = (day, mealType) => {
    setSelectedSlot({ day, mealType });
    setShowRecipeBrowser(true);
  };

  // Filter recipes based on search and category
  const filteredRecipes = userRecipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate weekly stats
  const getWeeklyStats = () => {
    if (!mealPlan) return { totalMeals: 0, totalTime: 0, categories: new Set() };
    
    let totalMeals = 0;
    let totalTime = 0;
    const categories = new Set();

    days.forEach(day => {
      mealTypes.forEach(mealType => {
        const recipe = mealPlan.days[day][mealType];
        if (recipe) {
          totalMeals++;
          totalTime += recipe.cookingTime || 0;
          if (recipe.category) categories.add(recipe.category);
        }
      });
    });

    return { totalMeals, totalTime, categories: categories.size };
  };

  if (loading) {
    return (
      <div className="meal-planner-loading">
        <div className="loading-spinner"></div>
        <p>Loading your meal planner...</p>
      </div>
    );
  }

  const stats = getWeeklyStats();

  return (
    <div className="ultra-meal-planner">
      {/* Updated Background with Home.js Styling */}
      <div className="planner-hero-section">
        {/* Background Image with Overlay */}
        <div className="planner-background-image">
          <div className="background-overlay"></div>
          {/* Animated Gradient Orbs */}
          <div className="gradient-orbs">
            <div className="orb orb-1"></div>
            <div className="orb orb-2"></div>
            <div className="orb orb-3"></div>
          </div>
          
          {/* Floating Particles */}
          <div className="floating-particles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="particle" style={{
                '--delay': `${i * 0.3}s`,
                '--duration': `${10 + i * 1.5}s`,
                '--x': `${(i * 5) % 100}%`,
                '--y': `${(i * 7) % 100}%`
              }}></div>
            ))}
          </div>
        </div>

        <div className="planner-container">
          {/* Header */}
          <div className="planner-header">
            <div className="header-content">
              <h1>🍽️ Weekly Meal Planner</h1>
              <p>Plan your meals for the week and make cooking easier!</p>
            </div>
            <div className="header-stats">
              <div className="stat">
                <span className="stat-number">{stats.totalMeals}</span>
                <span className="stat-label">Meals Planned</span>
              </div>
              <div className="stat">
                <span className="stat-number">{stats.totalTime}</span>
                <span className="stat-label">Total Minutes</span>
              </div>
              <div className="stat">
                <span className="stat-number">{stats.categories}</span>
                <span className="stat-label">Categories</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <Link to="/shopping-list" className="btn btn-primary">
              🛒 Generate Shopping List
            </Link>
            <Link to="/add-recipe" className="btn btn-secondary">
              ➕ Add New Recipe
            </Link>
            <Link to="/recipes" className="btn btn-outline">
              📚 View All Recipes
            </Link>
          </div>

          {/* Meal Plan Grid */}
          <div className="meal-plan-grid">
            {days.map(day => (
              <div key={day} className="day-column">
                <div className="day-header">
                  <h3>{dayNames[day]}</h3>
                  {new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() === day && (
                    <span className="today-badge">Today</span>
                  )}
                </div>
                
                {mealTypes.map(mealType => (
                  <div key={mealType} className="meal-slot">
                    <div className="meal-slot-header">
                      <span className="meal-icon">{mealIcons[mealType]}</span>
                      <span className="meal-type">{mealType}</span>
                    </div>
                    
                    <div className="meal-content">
                      {mealPlan.days[day][mealType] ? (
                        <div className="assigned-recipe">
                          <div className="recipe-emoji">
                            {getCategoryEmoji(mealPlan.days[day][mealType].category)}
                          </div>
                          <div className="recipe-info">
                            <h4>{mealPlan.days[day][mealType].title}</h4>
                            <p>{mealPlan.days[day][mealType].cookingTime} min • {mealPlan.days[day][mealType].difficulty}</p>
                          </div>
                          <div className="recipe-actions">
                            <button 
                              onClick={() => openRecipeBrowser(day, mealType)}
                              className="btn-replace"
                              title="Change recipe"
                            >
                              🔄
                            </button>
                            <button 
                              onClick={() => removeRecipe(day, mealType)}
                              className="btn-remove"
                              title="Remove recipe"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button 
                          onClick={() => openRecipeBrowser(day, mealType)}
                          className="btn-add-recipe"
                        >
                          + Add Recipe
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recipe Browser Modal */}
      {showRecipeBrowser && (
        <div className="modal-overlay">
          <div className="recipe-browser-modal">
            <div className="modal-header">
              <h3>Choose a Recipe for {dayNames[selectedSlot.day]} {selectedSlot.mealType}</h3>
              <button 
                onClick={() => setShowRecipeBrowser(false)}
                className="btn-close"
              >
                ×
              </button>
            </div>

            <div className="modal-filters">
              <input
                type="text"
                placeholder="🔍 Search your recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="category-filter"
              >
                <option value="All">All Categories</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Dessert">Dessert</option>
                <option value="Snack">Snack</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
              </select>
            </div>

            <div className="recipes-grid">
              {filteredRecipes.length === 0 ? (
                <div className="no-recipes">
                  <div className="no-recipes-icon">📚</div>
                  <h4>No recipes found</h4>
                  <p>{searchTerm || selectedCategory !== 'All' ? 'Try changing your search or filters' : 'Create some recipes first!'}</p>
                  <Link to="/add-recipe" className="btn btn-primary">
                    Create Your First Recipe
                  </Link>
                </div>
              ) : (
                filteredRecipes.map(recipe => (
                  <div 
                    key={recipe._id} 
                    className="recipe-option"
                    onClick={() => assignRecipe(selectedSlot.day, selectedSlot.mealType, recipe._id)}
                  >
                    <div className="recipe-emoji-large">
                      {getCategoryEmoji(recipe.category)}
                    </div>
                    <div className="recipe-details">
                      <h4>{recipe.title}</h4>
                      <p>{recipe.cookingTime} min • {recipe.difficulty}</p>
                      <span className="recipe-category">{recipe.category}</span>
                    </div>
                    <button className="btn-select">Select</button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {saving && (
        <div className="saving-overlay">
          <div className="saving-spinner"></div>
          <p>Saving your meal plan...</p>
        </div>
      )}
    </div>
  );
};

export default MealPlanner;