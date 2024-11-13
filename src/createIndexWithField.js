require('dotenv').config();
const { Client } = require('@elastic/elasticsearch');

const client = new Client({
  node: process.env.EL_URL,
  auth: {
    apiKey: process.env.EL_KEY,
  },
});

async function createIndexWithMapping(indexName) {
  try {
    await client.indices.create({
      index: indexName,
      body: {
        mappings: {
          properties: {
            manufacturer: { type: 'keyword' },
            model: { type: 'keyword' },
            year: { type: 'integer' },
            content: { type: 'text' },
            trim: { type: 'text' },
            revision: { type: 'keyword' },
            publication_date: { type: 'date' },
          },
        },
      },
    });
    console.log(`Index ${indexName} created with custom mapping.`);
  } catch (error) {
    console.error('Error creating index:', error);
  }
}

// Example usage
createIndexWithMapping('ai-llm');
