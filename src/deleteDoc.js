require('dotenv').config();
const { extractTextFromPDF } = require('./indexData');
const { Client } = require('@elastic/elasticsearch');

const client = new Client({
  node: process.env.EL_URL,
  auth: {
    apiKey: process.env.EL_KEY,
  },
});

async function deleteDocumentById(indexName, documentId) {
  try {
    const result = await client.delete({
      index: indexName,
      id: documentId,
    });

    console.log('Document deleted:', result);
  } catch (error) {
    console.error('Error deleting document:', error);
  }
}

deleteDocumentById('ai-llm', 'Hxu6JpMB9j9xp8HbWFMN');
