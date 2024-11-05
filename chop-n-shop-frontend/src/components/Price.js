import React, { useState } from 'react';
const mockGroceryLists = [
  {
    name: 'Weekly Groceries',
    items: [
      { name: 'Milk', quantity: 1 },
      { name: 'Bread', quantity: 2 },
      { name: 'Eggs', quantity: 1 }
    ]
  },
  {
    name: 'Monthly Essentials',
    items: [
      { name: 'Rice', quantity: 5 },
      { name: 'Pasta', quantity: 2 },
      { name: 'Tomato Sauce', quantity: 3 }
    ]
  }
];
const mockStores = {
  Walmart: {
    Milk: 3.99,
    Bread: 2.49,
    Eggs: 4.99,
    Rice: 6.99,
    Pasta: 1.29,
    'Tomato Sauce': 1.99
  },
  Target: {
    Milk: 4.19,
    Bread: 2.59,
    Eggs: 4.89,
    Rice: 6.49,
    Pasta: 1.19,
    'Tomato Sauce': 2.09
  }
};