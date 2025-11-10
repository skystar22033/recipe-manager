import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ShoppingList = () => {
  const [shoppingList, setShoppingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkedItems, setCheckedItems] = useState({});
  const [organizedList, setOrganizedList] = useState({});

  useEffect(() => {
    fetchShoppingList();
  }, []);

  const fetchShoppingList = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      // Get current meal plan
      const mealPlanRes = await axios.get('http://localhost:5000/api/mealplans/current', config);
      
      if (mealPlanRes.data._id) {
        // Generate shopping list
        const shoppingRes = await axios.get(
          `http://localhost:5000/api/mealplans/${mealPlanRes.data._id}/shopping-list`,
          config
        );
        
        setShoppingList(shoppingRes.data);
        organizeByCategory(shoppingRes.data);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching shopping list:', error);
      setLoading(false);
    }
  };

  // Organize items by category for better shopping experience
  const organizeByCategory = (items) => {
    const organized = {};
    
    items.forEach(item => {
      const category = item.category || 'Other';
      if (!organized[category]) {
        organized[category] = [];
      }
      organized[category].push(item);
    });
    
    setOrganizedList(organized);
  };

  const handleCheckItem = (itemName) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  const handleCheckCategory = (category) => {
    const categoryItems = organizedList[category] || [];
    const allChecked = categoryItems.every(item => checkedItems[item.name]);
    
    const newCheckedState = { ...checkedItems };
    categoryItems.forEach(item => {
      newCheckedState[item.name] = !allChecked;
    });
    
    setCheckedItems(newCheckedState);
  };

  const clearCheckedItems = () => {
    const newShoppingList = shoppingList.filter(item => !checkedItems[item.name]);
    setShoppingList(newShoppingList);
    organizeByCategory(newShoppingList);
    
    const newCheckedState = {};
    newShoppingList.forEach(item => {
      newCheckedState[item.name] = false;
    });
    setCheckedItems(newCheckedState);
  };

  const printList = () => {
    window.print();
  };

  const getCategoryEmoji = (category) => {
    const emojis = {
      'Produce': '🥦',
      'Dairy': '🥛',
      'Meat': '🍗',
      'Bakery': '🍞',
      'Pantry': '🫙',
      'Frozen': '❄️',
      'Other': '📦'
    };
    return emojis[category] || '📦';
  };

  if (loading) {
    return (
      <div className="shopping-list-loading">
        <div className="loading-spinner"></div>
        <p>Generating your smart shopping list...</p>
      </div>
    );
  }

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalItems = shoppingList.length;
  const progress = totalItems > 0 ? (checkedCount / totalItems) * 100 : 0;

  return (
    <div className="ultra-shopping-list">
      {/* Background */}
      <div className="shopping-background">
        <div className="background-overlay"></div>
      </div>
      {/* Floating Background Elements */}
<div className="floating-elements">
  <div className="floating-element">🍳</div>
  <div className="floating-element">🥗</div>
  <div className="floating-element">🍝</div>
  <div className="floating-element">🥘</div>
  <div className="floating-element">🍽️</div>
</div>

      <div className="shopping-container">
        {/* Header */}
        <div className="shopping-header">
          <div className="header-content">
            <h1>🛒 Smart Shopping List</h1>
            <p>Everything you need for this week's meals</p>
          </div>
          
          <div className="header-stats">
            <div className="stat">
              <span className="stat-number">{totalItems}</span>
              <span className="stat-label">Total Items</span>
            </div>
            <div className="stat">
              <span className="stat-number">{checkedCount}</span>
              <span className="stat-label">Completed</span>
            </div>
            <div className="stat">
              <span className="stat-number">{totalItems - checkedCount}</span>
              <span className="stat-label">Remaining</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="shopping-actions">
          <button 
            onClick={clearCheckedItems} 
            className="btn btn-warning"
            disabled={checkedCount === 0}
          >
            🗑️ Clear Checked ({checkedCount})
          </button>
          <button onClick={printList} className="btn btn-primary">
            📄 Print List
          </button>
          <button onClick={fetchShoppingList} className="btn btn-outline">
            🔄 Refresh
          </button>
          <Link to="/meal-planner" className="btn btn-outline">
            ← Back to Planner
          </Link>
        </div>

        {shoppingList.length === 0 ? (
          <div className="empty-shopping-list">
            <div className="empty-illustration">
              <div className="empty-cart">🛒</div>
              <div className="floating-items">
                <span>🥦</span>
                <span>🍎</span>
                <span>🥛</span>
                <span>🍞</span>
                <span>🍗</span>
              </div>
            </div>
            <h2>Your shopping list is empty!</h2>
            <p>Add some recipes to your meal planner to automatically generate a shopping list.</p>
            <div className="empty-actions">
              <Link to="/meal-planner" className="btn btn-primary">
                🗓️ Plan Meals
              </Link>
              <Link to="/add-recipe" className="btn btn-secondary">
                ➕ Add Recipes
              </Link>
            </div>
          </div>
        ) : (
          <div className="shopping-content">
            {/* Progress Bar */}
            <div className="progress-section">
              <div className="progress-header">
                <h3>Shopping Progress</h3>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Organized Shopping List */}
            <div className="organized-list">
              {Object.entries(organizedList).map(([category, items]) => (
                <div key={category} className="category-section">
                  <div className="category-header">
                    <div className="category-title">
                      <span className="category-emoji">{getCategoryEmoji(category)}</span>
                      <h3>{category}</h3>
                      <span className="item-count">({items.length} items)</span>
                    </div>
                    <button 
                      onClick={() => handleCheckCategory(category)}
                      className="btn-category-check"
                    >
                      {items.every(item => checkedItems[item.name]) ? '☑️' : '☐'} Check All
                    </button>
                  </div>

                  <div className="category-items">
                    {items.map((item, index) => (
                      <div
                        key={index}
                        className={`shopping-item ${checkedItems[item.name] ? 'checked' : ''}`}
                      >
                        <label className="item-checkbox">
                          <input
                            type="checkbox"
                            checked={checkedItems[item.name] || false}
                            onChange={() => handleCheckItem(item.name)}
                          />
                          <span className="checkmark"></span>
                        </label>
                        
                        <div className="item-details">
                          <span className="item-name">{item.name}</span>
                          <span className="item-quantity">{item.quantity}</span>
                        </div>
                        
                        <div className="item-actions">
                          <button 
                            className="btn-quick-action"
                            onClick={() => handleCheckItem(item.name)}
                          >
                            {checkedItems[item.name] ? '✅' : '☐'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Tips */}
            <div className="shopping-tips">
              <h4>💡 Shopping Tips</h4>
              <div className="tips-grid">
                <div className="tip">
                  <span className="tip-emoji">📱</span>
                  <p>Use your phone to check off items as you shop</p>
                </div>
                <div className="tip">
                  <span className="tip-emoji">🔄</span>
                  <p>Refresh the list if you change your meal plan</p>
                </div>
                <div className="tip">
                  <span className="tip-emoji">🖨️</span>
                  <p>Print the list for offline shopping</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .navbar, .shopping-actions, .shopping-tips,
          .btn-category-check, .item-actions {
            display: none !important;
          }
          
          .shopping-item.checked {
            text-decoration: line-through;
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
};

export default ShoppingList;