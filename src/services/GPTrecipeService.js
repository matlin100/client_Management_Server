const { parseRecipesToJson } = require('../utils/recipeParser');
require('dotenv').config();
const OpenAI = require('openai');

const token_per_Recipes = 200

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getRecipesIngredientsByGPT(query, maxRecipes) {
    //Construct the prompt for GPT
    const prompt = `List of ${maxRecipes} recipes ingredients and Instructions for ${query} Each recipe will have ingredients: instructions: words fore ingredients and instructions
    Each recipe will start with a recipe name: = the number of the recipe in English`;
  
    // Call the GPT API
    const response = await openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-3.5-turbo',
        max_tokens: (token_per_Recipes * maxRecipes)  
      });
     
     // Extract the response text
     const textResponse = response.choices[0].message.content;

     // Parse the response into a structured JSON format
     return parseRecipesToJson(textResponse);
  }

  async function getFoofsuggestByMoodFromGPT(query) {
    // Construct the prompt for GPT
    const prompt = `giv me the best food type suggest that suitable for the forward text = '${query}' Maximum  result in four food type suggest English words (example result is 'Hamburger with egg and pizza' res not  longer of four words)`;
    // Call the GPT API
    const response = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
      max_tokens: (token_per_Recipes * 4)  
    });
   
   // Extract the response text
   return response.choices[0].message.content;
  
  } 

  async function getRecipesByIngredients(ingredients) {
    const prompt = `Create 4 recipes using the main following ingredients: ${ingredients.join(", ")} each recipe will have ingredients: instructions: words fore ingredients and instructions
    Each recipe will start with a recipe name: = the number of the recipe .`;
    // Call the GPT API
    const response = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
      max_tokens: (token_per_Recipes * 4)  
    });
   
   // Extract the response text
   const textResponse = response.choices[0].message.content;

   // Parse the response into a structured JSON format
   return parseRecipesToJson(textResponse);
}

module.exports = {
    getRecipesIngredientsByGPT,
    getFoofsuggestByMoodFromGPT,
    getRecipesByIngredients
};




//async function main() {
    //   const chatCompletion = await openai.chat.completions.create({
    //     messages: [{ role: 'user', content: 'good pizza recipe' }],
    //     model: 'gpt-3.5-turbo',
    //   });
    //   console.log(chatCompletion);
    // }
    
    // main();