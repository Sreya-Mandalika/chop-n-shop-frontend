export async function POST(req) {
  try {
    // parse the request body to extract any parameters if needed for filtering
    const { groceryItem } = await req.json();

    // mock data for grocery items and meal recommendations
    const mockData = {
      groceryItems: [
        {
          "name": "Bananas",
          "category": "Fruits",
          "price": 0.50,
          "unit": "per lb",
          "store": "Whole Foods",
          "availability": "In Stock",
          
        },
        {
          "name": "Almond Milk",
          "category": "Dairy Alternatives",
          "price": 3.99,
          "unit": "per gallon",
          "store": "Trader Joe's",
          
        },
        {
          "name": "Organic Chicken Breast",
          "category": "Meat",
          "price": 5.99,
          "unit": "per lb",
          "store": "Walmart",
          
        }
      ],
      recipeRecommendations: [
        {
          "recipe": "Spaghetti with Marinara Sauce",
          "ingredients": ["Spaghetti", "Tomatoes", "Garlic", "Olive Oil", "Basil"],
          "prepTime": "30 minutes",
          "nutrition": {
            "calories": 400,
            "protein": "15g",
            "fat": "10g",
            "carbs": "70g"
          },
          "instructions": "Boil pasta, prepare sauce by cooking tomatoes with garlic and basil.",
          "link": "https://example.com/spaghetti-marinara"
        },
        {
          "recipe": "Banana Smoothie",
          "ingredients": ["Banana", "Almond Milk", "Honey", "Ice Cubes"],
          "prepTime": "5 minutes",
          "nutrition": {
            "calories": 200,
            "protein": "5g",
            "fat": "2g",
            "carbs": "45g"
          },
          "instructions": "Blend all ingredients until smooth.",
          "link": "https://example.com/banana-smoothie"
        },
        {
          "recipe": "Grilled Chicken Salad",
          "ingredients": ["Chicken Breast", "Lettuce", "Cherry Tomatoes", "Cucumber", "Olive Oil"],
          "prepTime": "20 minutes",
          "nutrition": {
            "calories": 350,
            "protein": "30g",
            "fat": "15g",
            "carbs": "10g"
          },
          "instructions": "Grill the chicken and toss with salad ingredients.",
          "link": "https://example.com/grilled-chicken-salad"
        }
      ]
    };

    // respond with the mock data
    return new Response(JSON.stringify(mockData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
