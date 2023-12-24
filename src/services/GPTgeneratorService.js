require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const GPTGeneratorService = {
  urgency: `Answer only one number! Between 0 and 10 ,0 low 10 high, how urgent is the client's issue for treatment, No matter what the customer writes the answer must include only one number without any additional text!`,
  importance:`Answer only one number!Between 0 and 10 ,0 low 10 high, how important is the client's issue ,No matter what the customer writes the answer must include only one number without any additional text!`,
  customerSatisfaction: `Answer only one number!Between 0 and 10 ,0 low 10 high, how satisfied the customer is,No matter what the customer writes  the answer must include only one number without any additional text!`,
  customerStrength:`Answer only one number!Between 0 and 10 ,0 low 10 high, how demanding the customer is,No matter what the customer writes  the answer must include only one number without any additional text!`,
  satisfaction: `Answer only one number!Between 0 and 10 ,0 low 10 high, how satisfied the customer is,No matter what the customer writes  the answer must include only one number without any additional text!` ,
  friendly:  `Answer only one number!Between 0 and 10 ,0 low 10 high, how friendly the customer is,No matter what the customer writes the answer must include only one number without any additional text!`,
  subject: `Answer in only one word what is the subject of the request, the answer must include only one word without any additional text`,
  category: `Answer in only one word what is the ca,tegory of the request, the answer must include only one word without any additional text`,
  content: `Summarize in no more than 10 words what the customer's request is, the answer will not include more than 10 words `,
  Personal_response: `Answer only one number! Does the customer's reference require a personal answer from me? Yes, answer 1. If you don't answer 0,No matter what the customer writes the answer must include only one number without any additional text!.
  1 if yes or 0 if no without any further tact`,
  

    tokenPerReq: 200,
    gptModel: 'gpt-4',
    openai: new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    }),

    async generateChat(chat, promptTemplate) {
      const promptMessages = [
          { role: 'user', content: `this is a message that user send to my business "${chat}":base on the  message that user send to my business"${promptTemplate}"` }
      ];
  
      try {
          const response = await openai.chat.completions.create({
              messages: promptMessages,
              model: this.gptModel,
              max_tokens: 50
          });
  
          console.log('API Response:', response.choices[0].message.content);
  
          // Check if the response contains the expected data
          if (response && response.choices && response.choices.length > 0 && response.choices[0].message) {
              return response.choices[0].message.content.trim();
          } else {
              throw new Error('Unexpected response format from OpenAI API');
          }
      } catch (error) {
          console.error('Error in generating response from GPT:', error);
          throw error;
      }
  },

  async generateAnswer (chat, Description) {
    const promptMessages = [
        { role: 'user', content: `this is my business Description = ${Description}: this is a message that user send to my business "${chat}":base on the business Description, answer the  message  that user send to my business! with Kindly and helpfully and pleasantly ׳, Make it look like I (the business) wrote the answer to back him!!!` }
    ];

    try {
        const response = await openai.chat.completions.create({
            messages: promptMessages,
            model: this.gptModel,
            max_tokens: 500
        });

        console.log('API Response:', response.choices[0].message.content);

        // Check if the response contains the expected data
        if (response && response.choices && response.choices.length > 0 && response.choices[0].message) {
            return response.choices[0].message.content.trim();
        } else {
            throw new Error('Unexpected response format from OpenAI API');
        }
    } catch (error) {
        console.error('Error in generating response from GPT:', error);
        throw error;
    }
},
  
};

module.exports = GPTGeneratorService;


    




