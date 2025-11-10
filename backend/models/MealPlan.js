const mongoose = require('mongoose');

const MealPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  weekStart: {
    type: Date,
    required: true
  },
  days: {
    monday: {
      breakfast: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
      lunch: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
      dinner: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }
    },
    tuesday: {
      breakfast: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
      lunch: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
      dinner: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }
    },
    wednesday: {
      breakfast: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
      lunch: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
      dinner: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }
    },
    thursday: {
      breakfast: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
      lunch: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
      dinner: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }
    },
    friday: {
      breakfast: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
      lunch: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
      dinner: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }
    },
    saturday: {
      breakfast: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
      lunch: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
      dinner: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }
    },
    sunday: {
      breakfast: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
      lunch: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
      dinner: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }
    }
  }
}, {
  timestamps: true
});

// Ensure one meal plan per user per week
MealPlanSchema.index({ userId: 1, weekStart: 1 }, { unique: true });

module.exports = mongoose.model('MealPlan', MealPlanSchema);