import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Recipes from './pages/Recipes';
import AddRecipe from './pages/AddRecipe';
import EditRecipe from './pages/EditRecipe';
import RecipeDetail from './pages/RecipeDetail';
import MealPlanner from './pages/MealPlanner';
import ShoppingList from './pages/ShoppingList';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="App">
      {/* Premium Animated Recipe Background */}
      <div className="recipe-background">
        <div className="floating-recipe"></div>
        <div className="floating-recipe"></div>
        <div className="floating-recipe"></div>
        <div className="floating-recipe"></div>
        <div className="floating-recipe"></div>
        <div className="floating-recipe"></div>
        <div className="floating-recipe"></div>
        <div className="floating-recipe"></div>
      </div>
      
      <div className="content-overlay">
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/add-recipe" element={<AddRecipe />} />
            <Route path="/edit-recipe/:id" element={<EditRecipe />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/meal-planner" element={<MealPlanner />} />
            <Route path="/shopping-list" element={<ShoppingList />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;