require('dotenv').config();
const OpenAI = require('openai');

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

async function getChatGPTResponse(prompt) {
  try {
    const response = await client.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
    });

    console.log(response.data.choices[0].message.content);

    //   const stream = await client.chat.completions.create({
    //     model: 'gpt-4',
    //     messages: [{ role: 'user', content: 'Say this is a test' }],
    //     stream: true,
    //   });
    //   for await (const chunk of stream) {
    //     process.stdout.write(chunk.choices[0]?.delta?.content || '');
    //   }
    // }
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

getChatGPTResponse('How to add key for tesla model 3');
