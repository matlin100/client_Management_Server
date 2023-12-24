require('dotenv').config();
const axios = require('axios');

async function getImageUrlForType(type, amount = 10){ 
    const apiKey = process.env.IMAGE_API_KEY; // Your Unsplash Access Key
    const apiUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(type)}&client_id=${apiKey}&per_page=${amount}`;
    try {
        const response = await axios.get(apiUrl);
        // Extract URLs from all fetched images
        const imageUrls = response.data.results.map(image => image.urls.regular);
        return imageUrls; // Returns an array of image URLs
    } catch (error) {
        console.error('Error fetching image:', error);
        return []; // Return an empty array or default image URLs
    }
}
    

module.exports = {
    getImageUrlForType
};
