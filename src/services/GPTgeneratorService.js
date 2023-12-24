require('dotenv').config();
const { OpenAI } = require('openai');

const GPTGeneratorService = {
  urgency: `Answer only one number! Between one and ten, how urgent is the client's issue for treatment, the answer must include a number one without any additional text`,
  importance:`Answer only one number! Between one and ten, how important is the client's issue to the treatment, the answer must include one number without any additional text`,
  customerSatisfaction: `Answer only one number! Between one and ten how satisfied the customer is, the answer must include the number one without any additional text`,
  customerStrength:`Answer only one number! Between one and ten, how demanding the customer is, the answer must include the number one without any additional text`,
  satisfaction: `Answer only one number! Between one and ten how satisfied the customer is, the answer must include the number one without any additional text` ,
  friendly:  `Answer only one number! No matter how friendly the customer is, the answer must include one number without any additional text`,
  subject: `Answer in only one word what is the subject of the request, the answer must include only one word without any additional text`,
  category: `Answer in only one word what is the ca,tegory of the request, the answer must include only one word without any additional text`,
  content: `Summarize in no more than 10 words what the customer's request is, the answer will not include more than 10 words`,
  Personal_response: `Answer only one number! Does the customer's reference require a personal answer from me? Yes, answer 1. If you don't answer 0, the answer must include one number.
  1 if yes or 0 if no without any further tact`,
  

    tokenPerReq: 200,
    gptModel: 'gpt-3.5-turbo',
    openai: new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    }),

    async generateResponse(chat, businessDescription, promptTemplate) {
        const prompt = `${promptTemplate} Based on this business description: "${businessDescription}", and this message: "${chat}"`;

        try {
            const response = await this.openai.createCompletion({
                model: this.gptModel,
                prompt: prompt,
                max_tokens: this.tokenPerReq
            });

            return response.data.choices[0].text.trim();
        } catch (error) {
            console.error('Error in generating response from GPT:', error);
            throw error;
        }
    }
};

module.exports = GPTGeneratorService;


    




