require('dotenv').config();
const pdf = require('pdf-parse');
const fs = require('fs');
const { Client } = require('@elastic/elasticsearch');

const client = new Client({
  node: process.env.EL_URL,
  auth: {
    apiKey: process.env.EL_KEY,
  },
});

module.exports = {
  async extractTextFromPDF(filePath) {
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdf(dataBuffer);
    return pdfData.text;
  },

  async indexTextInElasticsearch(indexName, documentId, text) {
    await client.index({
      index: indexName,
      id: documentId,
      body: {
        content: text,
      },
    });
  },
};
