import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentRecipes, setRecentRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoadErrors, setImageLoadErrors] = useState({});
  const heroRef = useRef(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // High-quality food images from Unsplash
  const premiumFoodImages = {
    default: [
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&h=300&fit=crop'
    ],
    breakfast: [
      'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1525352396658-d737b3c4d137?w=400&h=300&fit=crop'
    ],
    lunch: [
      'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop'
    ],
    dinner: [
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1565299585323-38174c13fae8?w=400&h=300&fit=crop'
    ],
    dessert: [
      'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop'
    ]
  };

  const getRecipeImage = (recipe, index) => {
    // If recipe has its own image, use it
    if (recipe.image && !imageLoadErrors[recipe._id]) {
      return recipe.image;
    }
    
    // Otherwise use a curated image based on category
    const category = recipe.category?.toLowerCase();
    const categoryImages = premiumFoodImages[category] || premiumFoodImages.default;
    return categoryImages[index % categoryImages.length];
  };

  const handleImageError = (recipeId) => {
    setImageLoadErrors(prev => ({ ...prev, [recipeId]: true }));
  };

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const [statsRes, recipesRes] = await Promise.all([
        axios.get('http://localhost:5000/api/recipes/stats/summary', config),
        axios.get('http://localhost:5000/api/recipes?limit=6', config)
      ]);

      setStats(statsRes.data);
      setRecentRecipes(recipesRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="ultra-loading">
        <div className="ultra-spinner">
          <div className="spinner-ring ultra-1"></div>
          <div className="spinner-ring ultra-2"></div>
          
        </div>
        <p className="loading-text-ultra">Crafting Your Culinary Experience</p>
      </div>
    );
  }

  return (
    <div className="ultra-premium-dashboard">
      {/* Ultra Premium Hero Section */}
      <div className="ultra-hero" ref={heroRef}>
        {/* Animated Background Layers */}
        <div className="hero-bg-layers">
          <div className="bg-layer layer-1"></div>
          <div className="bg-layer layer-2"></div>
          <div className="bg-layer layer-3"></div>
          <div className="bg-layer layer-4"></div>
        </div>

        {/* Floating Particles */}
        <div className="particle-system">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="particle" style={{
              '--delay': `${i * 0.5}s`,
              '--duration': `${15 + i * 2}s`,
              '--size': `${3 + (i % 3)}px`,
              '--x': `${(i * 7) % 100}%`,
              '--y': `${(i * 11) % 100}%`
            }}></div>
          ))}
        </div>

        {/* Animated Gradient Orbs */}
        <div className="gradient-orbs-ultra">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
          <div className="orb orb-4"></div>
        </div>

        {/* Hero Content */}
        <div className="ultra-hero-content">
          <div className="hero-text-content">
            {/* Main Title with Gradient Animation */}
            <h1 className="ultra-main-title">
              <span className="title-line title-line-1">
                <span className="title-gradient">Welcome to Your</span>
              </span>
              <span className="title-line title-line-2">
                <span className="title-animate">Culinary Masterpiece</span>
              </span>
            </h1>

            {/* Animated Subtitle */}
            <p className="ultra-subtitle">
              <span className="subtitle-text">
                Transform your kitchen into a creative studio where every recipe tells a story
              </span>
            </p>

            {/* Animated Stats */}
            <div className="ultra-stats">
              <div className="stat-item-ultra">
                <div className="stat-number-ultra" data-count={stats?.totalRecipes || 0}>
                  {stats?.totalRecipes || 0}
                </div>
                <div className="stat-label-ultra">Recipes Created</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item-ultra">
                <div className="stat-number-ultra" data-count={recentRecipes.reduce((total, recipe) => total + recipe.cookingTime, 0)}>
                  {recentRecipes.reduce((total, recipe) => total + recipe.cookingTime, 0)}
                </div>
                <div className="stat-label-ultra">Minutes of Magic</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item-ultra">
                <div className="stat-number-ultra" data-count={stats?.categoryStats?.length || 0}>
                  {stats?.categoryStats?.length || 0}
                </div>
                <div className="stat-label-ultra">Categories</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="ultra-cta-buttons">
              <Link to="/add-recipe" className="cta-primary-ultra">
                <span className="cta-glow"></span>
                <span className="cta-icon">✨</span>
                Create New Recipe
                <span className="cta-arrow">→</span>
              </Link>
              <Link to="/recipes" className="cta-secondary-ultra">
                <span className="cta-icon">📚</span>
                Browse Library
              </Link>
            </div>
          </div>

          {/* Hero Visual - Premium Floating Recipe Cards */}
          <div className="hero-visual-ultra">
            <div className="floating-cards-container">
              {recentRecipes.slice(0, 3).map((recipe, index) => (
                <div key={recipe._id} className="floating-card-ultra" style={{
                  '--card-delay': `${index * 0.3}s`,
                  '--card-duration': `${8 + index * 2}s`
                }}>
                  <div className="card-inner-ultra">
                    <div className="card-image-ultra">
                      <img 
                        src={getRecipeImage(recipe, index)} 
                        alt={recipe.title}
                        onError={() => handleImageError(recipe._id)}
                        loading="lazy"
                      />
                      <div className="card-overlay-ultra">
                        <div className="view-recipe-btn">
                          <span>View Recipe</span>
                          <span className="btn-arrow">👁️</span>
                        </div>
                      </div>
                      {/* Premium Badge */}
                      <div className="premium-badge">
                        <span className="badge-icon">⭐</span>
                        Premium
                      </div>
                    </div>
                    <div className="card-content-ultra">
                      <h4>{recipe.title}</h4>
                      <div className="card-meta-ultra">
                        <span className="cooking-time">
                          ⏱️ {recipe.cookingTime}m
                        </span>
                        <span className={`difficulty-ultra ${recipe.difficulty?.toLowerCase() || 'medium'}`}>
                          {recipe.difficulty || 'Medium'}
                        </span>
                      </div>
                      {recipe.category && (
                        <div className="recipe-category">
                          <span className="category-tag">
                            {getRecipeEmoji(recipe.category)} {recipe.category}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator-ultra">
          <div className="scroll-line"></div>
          <span>Explore More</span>
        </div>
      </div>

      {/* Recent Recipes Section */}
      <div className="dashboard-content-ultra">
        <div className="content-section ultra-recent-recipes">
          <div className="section-header-ultra">
            <h2 className="section-title-ultra">
              <span className="title-icon">🔥</span>
              Recent Creations
            </h2>
            <p className="section-subtitle-ultra">
              Your latest culinary masterpieces
            </p>
          </div>
          
          <div className="recipes-grid-ultra">
            {recentRecipes.map((recipe, index) => (
              <Link key={recipe._id} to={`/recipe/${recipe._id}`} className="recipe-card-premium">
                <div className="recipe-image-container">
                  <img 
                    src={getRecipeImage(recipe, index + 3)} 
                    alt={recipe.title}
                    onError={() => handleImageError(recipe._id)}
                    loading="lazy"
                  />
                  <div className="recipe-overlay-premium">
                    <div className="quick-view-btn">
                      <span>Quick View</span>
                    </div>
                  </div>
                  <div className="recipe-badges">
                    <span className={`difficulty-badge ${recipe.difficulty?.toLowerCase() || 'medium'}`}>
                      {recipe.difficulty || 'Medium'}
                    </span>
                    <span className="time-badge">
                      ⏱️ {recipe.cookingTime}
                    </span>
                  </div>
                </div>
                <div className="recipe-info-premium">
                  <h3 className="recipe-title-premium">{recipe.title}</h3>
                  <div className="recipe-meta-premium">
                    <span className="category-premium">
                      {getRecipeEmoji(recipe.category)} {recipe.category}
                    </span>
                    {recipe.rating && (
                      <span className="rating-premium">
                        ⭐ {recipe.rating}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced helper function with more emojis
const getRecipeEmoji = (category) => {
  if (!category) return '🍽️';
  
  const emojis = {
    Breakfast: '🍳', Lunch: '🥪', Dinner: '🍝', Dessert: '🍰',
    Snack: '🍎', Vegetarian: '🥦', Vegan: '🌱', Italian: '🍕',
    Mexican: '🌮', Asian: '🍜', Indian: '🍛', Mediterranean: '🥙',
    American: '🍔', French: '🥐', Japanese: '🍣', Chinese: '🥡',
    Thai: '🍲', Seafood: '🐟', BBQ: '🍖', Healthy: '🥗',
    Comfort: '🍲', Quick: '⚡', Gourmet: '👨‍🍳'
  };
  
  return emojis[category] || '🍽️';
};

export default Dashboard;