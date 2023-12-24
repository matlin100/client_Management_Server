// services/visionService.js
const axios = require('axios');
require('dotenv').config();

const azureKey = process.env.AZURE_KEY;
const azureEndpoint = process.env.AZURE_ENDPOINT;


async function analyzeImage(imageBuffer) {
    try {
        const response = await axios.post(`${azureEndpoint}vision/v3.1/analyze`, imageBuffer, {
            params: {
                'visualFeatures': 'Description',
            },
            headers: {
                'Content-Type': 'application/octet-stream',
                'Ocp-Apim-Subscription-Key': azureKey
            }
        });

        // Extracting and returning image descriptions
        return response.data.description.captions.map(caption => caption.text);
    } catch (error) {
        console.error('Error analyzing image:', error);
        throw error;
    }
}

module.exports = { analyzeImage };
