const express = require('express');
const auth = require('../middleware/auth');
const MealPlan = require('../models/MealPlan');
const Recipe = require('../models/Recipe');
const moment = require('moment');

const router = express.Router();

// Get or create meal plan for current week
router.get('/current', auth, async (req, res) => {
  try {
    const weekStart = moment().startOf('week').toDate();
    
    let mealPlan = await MealPlan.findOne({
      userId: req.user._id,
      weekStart
    }).populate('days.monday.breakfast days.monday.lunch days.monday.dinner')
      .populate('days.tuesday.breakfast days.tuesday.lunch days.tuesday.dinner')
      .populate('days.wednesday.breakfast days.wednesday.lunch days.wednesday.dinner')
      .populate('days.thursday.breakfast days.thursday.lunch days.thursday.dinner')
      .populate('days.friday.breakfast days.friday.lunch days.friday.dinner')
      .populate('days.saturday.breakfast days.saturday.lunch days.saturday.dinner')
      .populate('days.sunday.breakfast days.sunday.lunch days.sunday.dinner');

    if (!mealPlan) {
      mealPlan = new MealPlan({
        userId: req.user._id,
        weekStart,
        days: {
          monday: { breakfast: null, lunch: null, dinner: null },
          tuesday: { breakfast: null, lunch: null, dinner: null },
          wednesday: { breakfast: null, lunch: null, dinner: null },
          thursday: { breakfast: null, lunch: null, dinner: null },
          friday: { breakfast: null, lunch: null, dinner: null },
          saturday: { breakfast: null, lunch: null, dinner: null },
          sunday: { breakfast: null, lunch: null, dinner: null }
        }
      });
      await mealPlan.save();
      mealPlan = await MealPlan.findById(mealPlan._id).populate(
        'days.monday.breakfast days.monday.lunch days.monday.dinner ' +
        'days.tuesday.breakfast days.tuesday.lunch days.tuesday.dinner ' +
        'days.wednesday.breakfast days.wednesday.lunch days.wednesday.dinner ' +
        'days.thursday.breakfast days.thursday.lunch days.thursday.dinner ' +
        'days.friday.breakfast days.friday.lunch days.friday.dinner ' +
        'days.saturday.breakfast days.saturday.lunch days.saturday.dinner ' +
        'days.sunday.breakfast days.sunday.lunch days.sunday.dinner'
      );
    }

    res.json(mealPlan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update meal plan
router.put('/:id', auth, async (req, res) => {
  try {
    const { day, mealType, recipeId } = req.body;

    const mealPlan = await MealPlan.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!mealPlan) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }

    // Validate recipe belongs to user if provided
    if (recipeId) {
      const recipe = await Recipe.findOne({ _id: recipeId, userId: req.user._id });
      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
    }

    mealPlan.days[day][mealType] = recipeId || null;
    await mealPlan.save();

    const updatedMealPlan = await MealPlan.findById(mealPlan._id).populate(
      'days.monday.breakfast days.monday.lunch days.monday.dinner ' +
      'days.tuesday.breakfast days.tuesday.lunch days.tuesday.dinner ' +
      'days.wednesday.breakfast days.wednesday.lunch days.wednesday.dinner ' +
      'days.thursday.breakfast days.thursday.lunch days.thursday.dinner ' +
      'days.friday.breakfast days.friday.lunch days.friday.dinner ' +
      'days.saturday.breakfast days.saturday.lunch days.saturday.dinner ' +
      'days.sunday.breakfast days.sunday.lunch days.sunday.dinner'
    );

    res.json(updatedMealPlan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Generate shopping list
router.get('/:id/shopping-list', auth, async (req, res) => {
  try {
    const mealPlan = await MealPlan.findOne({
      _id: req.params.id,
      userId: req.user._id
    }).populate(
      'days.monday.breakfast days.monday.lunch days.monday.dinner ' +
      'days.tuesday.breakfast days.tuesday.lunch days.tuesday.dinner ' +
      'days.wednesday.breakfast days.wednesday.lunch days.wednesday.dinner ' +
      'days.thursday.breakfast days.thursday.lunch days.thursday.dinner ' +
      'days.friday.breakfast days.friday.lunch days.friday.dinner ' +
      'days.saturday.breakfast days.saturday.lunch days.saturday.dinner ' +
      'days.sunday.breakfast days.sunday.lunch days.sunday.dinner'
    );

    if (!mealPlan) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }

    const shoppingList = {};
    
    // Collect all ingredients from all meals
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const mealTypes = ['breakfast', 'lunch', 'dinner'];

    days.forEach(day => {
      mealTypes.forEach(mealType => {
        const recipe = mealPlan.days[day][mealType];
        if (recipe && recipe.ingredients) {
          recipe.ingredients.forEach(ingredient => {
            const key = ingredient.name.toLowerCase().trim();
            if (shoppingList[key]) {
              // If ingredient exists, combine quantities
              shoppingList[key].quantity += ` + ${ingredient.quantity}`;
            } else {
              shoppingList[key] = {
                name: ingredient.name,
                quantity: ingredient.quantity,
                category: 'Other'
              };
            }
          });
        }
      });
    });

    // Convert to array
    const shoppingListArray = Object.values(shoppingList);

    res.json(shoppingListArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;