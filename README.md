# Chop-N-Shop Frontend

## Overview

This week we worked on developing a React app to showcase our grocery shopping assistance features.
We incorporated several interactive components in price comparing, using real grocery store data.

## Development process

**Design Decisions:**
- We designed modular components that were consistent across the pages in our Figma wireframes. Using Figma for this made the collaboration process flow smoother.
- We integrated real life data to make even the prototype useful.

**Technical Choices:**   
- React.js Framework: React.js is used for its component-based architecture, efficient state management, and ability to dynamically update the UI, making it ideal for building interactive and responsive web applications. Its flexibility, performance optimizations makes it perfect for our project. 

- Tailwind CSS for Styling:Tailwind CSS was used for styling to simplify the design process with utility classes, enabling the creation of responsive and consistent layouts without the need for custom CSS.

## Site map

/home - Home page   
/profile - Profile of the User   
/grocery-list - Grocery lists page, create new, add items   
/recipe-book - Recipe page, search recipe, save for later   
/price-comparison - Price Comparison page, compares price of an individual item, compares price for the whole grocery list

## WireFrame
![WireFrame](public/WireFrame.png)

## AI Usage

Perplexity Integration: Perplexity was specifically used to generate code for the layout, providing guidance on structuring and aligning components effectively. It also helped with the tailwind CSS.    
Mock Data Generation: AI assistance was used to create mock data that simulates API responses.

## Project Setup
To set up and run the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sreya-Mandalika/chop-n-shop-frontend.git
   cd chop-n-shop-frontend
3. **Install requirements.txt:**
   ```bash
   npm install react@latest react-dom@latest
   npm install lucide-react
   npm install -D tailwindcss postcss autoprefixer
   npm install @radix-ui/react-icons class-variance-authority clsx tailwindcss-animate @shadcn/ui
2. **Run the application:** 
  ```bash
   npm start
