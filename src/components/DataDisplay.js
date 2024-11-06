import React, { useEffect, useState } from 'react';

export const mockData = {
  groceryItems: [
    {
      id: 1,
      name: "Bananas",
      category: "Fruits",
      price: 0.50,
      unit: "per lb",
      store: "Whole Foods",
      availability: "In Stock",
      
    },
    {
      id: 2,
      name: "Almond Milk",
      category: "Dairy Alternatives",
      price: 3.99,
      unit: "per gallon",
      store: "Trader Joe's",
      availability: "Out of Stock",
      
    },
    {
      id: 3,
      name: "Organic Chicken Breast",
      category: "Meat",
      price: 5.99,
      unit: "per lb",
      store: "Walmart",
      availability: "In Stock",
      
    }
  ],
  recipeRecommendations: [
    {
      id: 1,
      recipe: "Spaghetti with Marinara Sauce",
      ingredients: ["Spaghetti", "Tomatoes", "Garlic", "Olive Oil", "Basil"],
      prepTime: "30 minutes",
      nutrition: {
        calories: 400,
        protein: "15g",
        fat: "10g",
        carbs: "70g"
      },
      instructions: "Boil pasta, prepare sauce by cooking tomatoes with garlic and basil.",
      link: "https://example.com/spaghetti-marinara"
    },
    {
      id: 2,
      recipe: "Banana Smoothie",
      ingredients: ["Banana", "Almond Milk", "Honey", "Ice Cubes"],
      prepTime: "5 minutes",
      nutrition: {
        calories: 200,
        protein: "5g",
        fat: "2g",
        carbs: "45g"
      },
      instructions: "Blend all ingredients until smooth.",
      link: "https://example.com/banana-smoothie"
    },
    {
      id: 3,
      recipe: "Grilled Chicken Salad",
      ingredients: ["Chicken Breast", "Lettuce", "Cherry Tomatoes", "Cucumber", "Olive Oil"],
      prepTime: "20 minutes",
      nutrition: {
        calories: 350,
        protein: "30g",
        fat: "15g",
        carbs: "10g"
      },
      instructions: "Grill the chicken and toss with salad ingredients.",
      link: "https://example.com/grilled-chicken-salad"
    }
  ]
};

const DataDisplay = () => {
  const [groceryData, setGroceryData] = useState([]);
  const [recipeData, setRecipeData] = useState([]);
  const [priceData, setPriceData] = useState([]);

  useEffect(() => {
    const useMockData = process.env.REACT_APP_USE_MOCK_DATA === 'true';

    if (useMockData) {
      // using mock
      setGroceryData(mockData.groceryItems);
      setRecipeData(mockData.recipeRecommendations);
      setPriceData(mockData.groceryItems); 
    } else {
  
      console.log("API integration mode is active");
    }
  }, []);

  return (
    <div>
      <h2>Grocery List</h2>
      <ul>
        {groceryData.map((item) => (
          <li key={item.id}>
            {item.name} - Price: ${item.price} per {item.unit} - Availability: {item.availability}
          </li>
        ))}
      </ul>

      <h2>Recipe Suggestions</h2>
      <ul>
        {recipeData.map((recipe) => (
          <li key={recipe.id}>
            <strong>{recipe.recipe}</strong>: {recipe.ingredients.join(', ')}
            <p>Prep Time: {recipe.prepTime}</p>
            <p><a href={recipe.link} target="_blank" rel="noopener noreferrer">See recipe</a></p>
          </li>
        ))}
      </ul>

      <h2>Price Comparison</h2>
      <ul>
        {priceData.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong>: ${item.price}

          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataDisplay;
