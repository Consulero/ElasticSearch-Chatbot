require('dotenv').config();
const { extractTextFromPDF } = require('./indexData');
const { Client } = require('@elastic/elasticsearch');

const client = new Client({
  node: process.env.EL_URL,
  auth: {
    apiKey: process.env.EL_KEY,
  },
});

async function updateIndexDoc(indexName, documentId, document) {
  try {
    const filePath = '.\\source-pdf\\adding and removing keys.pdf';
    const text = await extractTextFromPDF(filePath);

    const result = await client.update({
      index: indexName,
      id: documentId,
      body: {
        doc: {
          model: document.model,
          year: document.year,
          manufacturer: document.manufacturer,
          trim: document.trim,
          revision: document.revision,
          publication_date: document.publicationDate,
          content: text,
        },
      },
    });

    console.log('Document updated:', result);
    // Document updated: {
    //   _index: 'ai-llm',
    //   _id: '8VIqIZMBcqaSaPtbM-QF',
    //   _version: 2,
    //   result: 'updated',
    //   _shards: { total: 1, successful: 1, failed: 0 },
    //   _seq_no: 1,
    //   _primary_term: 1
    // }
  } catch (error) {
    console.error('Error indexing document:', error);
  }
}

const indexName = 'ai-llm';
const modelName = 'Model 3';
const modelYear = 2022;
const modelManufacturer = 'Tesla';
const trim = 'Example text 1';
const revision = 'sample-keyword-revision';
const publicationDate = '2024-11-12';
const documentId = '8VIqIZMBcqaSaPtbM-QF';

updateIndexDoc(indexName, documentId, {
  model: modelName,
  year: modelYear,
  manufacturer: modelManufacturer,
  trim: trim,
  revision: revision,
  publicationDate: publicationDate,
});
