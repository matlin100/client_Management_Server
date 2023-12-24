// controllers/recipeController.js
const GPTrecipeService = require('../services/GPTrecipeService');
const imageUnsplashServer = require('../services/imageUnsplashServer')
const  { analyzeImage } =require( '../services/visionService')

async function getRecipesByTypeAndAmount(req, res) {
  try {
    const { type, amount } = req.body;
    const recipes = await GPTrecipeService.getRecipesIngredientsByGPT(type, amount);
    
    // Get the first recipe's name
    const firstRecipeName =  recipes[0].name 
    
    const imageUrl = await imageUnsplashServer.getImageUrlForType(firstRecipeName, amount); // Pass the first recipe's name
    res.json({ recipes, imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



async function getRecipesFromImage(req, res) {
  try {
      if (!req.file) {
          return res.status(400).send('No file uploaded');
      }

      const descriptions = await analyzeImage(req.file.buffer);

      // Assuming the first description is the most relevant
      const type = descriptions[0];

      // Call getRecipesByTypeAndAmount with the image description
      const recipes = await GPTrecipeService.getRecipesIngredientsByGPT(type, 4);
      const imageUrl = await imageUnsplashServer.getImageUrlForType(type, 4);
      res.json({recipes,imageUrl});
    
  } catch (error) {
      console.error(error);
      res.status(500).send('Error processing image');
  }
}

async function getRecipesFromMood(req, res) {
  try {
      const { type } = req.body ;
      // Call getRecipesByTypeAndAmount with the image description
      const suggest = await GPTrecipeService.getFoofsuggestByMoodFromGPT(type)
      const recipes = await GPTrecipeService.getRecipesIngredientsByGPT(suggest, 4);
      const imageUrl = await imageUnsplashServer.getImageUrlForType(suggest, 4);
      res.json({recipes,imageUrl});
    
  } catch (error) {
      console.error(error);
      res.status(500).send('Error processing image');
  }
}

async function getRecipesByIngredients(req, res) {
  try {
      const { ingredients } = req.body;
      const recipes = await GPTrecipeService.getRecipesByIngredients(ingredients);
      const firstRecipeName =  recipes[0].name 
      const imageUrl = await imageUnsplashServer.getImageUrlForType(firstRecipeName, 4);
      res.json({ recipes, imageUrl });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getRecipesByTypeAndAmount,
  getRecipesFromImage,
  getRecipesFromMood,
  getRecipesByIngredients,
};
