const express = require('express');
const auth = require('../middleware/auth');
const Recipe = require('../models/Recipe');

const router = express.Router();

// Get all recipes for logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const recipes = await Recipe.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single recipe
router.get('/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    });
    
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    
    res.json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Search recipes
router.get('/search', auth, async (req, res) => {
  try {
    const { query, category, difficulty } = req.query;
    let searchCriteria = { userId: req.user._id };

    if (query) {
      searchCriteria.title = { $regex: query, $options: 'i' };
    }
    if (category && category !== 'All') {
      searchCriteria.category = category;
    }
    if (difficulty && difficulty !== 'All') {
      searchCriteria.difficulty = difficulty;
    }

    const recipes = await Recipe.find(searchCriteria).sort({ createdAt: -1 });
    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get recipe statistics
router.get('/stats/summary', auth, async (req, res) => {
  try {
    const totalRecipes = await Recipe.countDocuments({ userId: req.user._id });
    
    const categoryStats = await Recipe.aggregate([
      { $match: { userId: req.user._id } },
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    const difficultyStats = await Recipe.aggregate([
      { $match: { userId: req.user._id } },
      { $group: { _id: '$difficulty', count: { $sum: 1 } } }
    ]);

    res.json({
      totalRecipes,
      categoryStats,
      difficultyStats
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new recipe
router.post('/', auth, async (req, res) => {
  try {
    const { 
      title, 
      description, 
      ingredients, 
      instructions, 
      cookingTime, 
      difficulty, 
      category 
    } = req.body;

    const recipe = new Recipe({
      title,
      description,
      ingredients,
      instructions,
      cookingTime,
      difficulty,
      category,
      userId: req.user._id
    });

    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update recipe
router.put('/:id', auth, async (req, res) => {
  try {
    const { 
      title, 
      description, 
      ingredients, 
      instructions, 
      cookingTime, 
      difficulty, 
      category 
    } = req.body;

    let recipe = await Recipe.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    });

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { 
        title, 
        description, 
        ingredients, 
        instructions, 
        cookingTime, 
        difficulty, 
        category 
      },
      { new: true }
    );

    res.json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete recipe
router.delete('/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    });

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;