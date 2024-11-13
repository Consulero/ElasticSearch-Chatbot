require('dotenv').config();
const { extractTextFromPDF } = require('./indexData');
const { Client } = require('@elastic/elasticsearch');
const fs = require('fs');

const client = new Client({
  node: process.env.EL_URL,
  auth: {
    apiKey: process.env.EL_KEY,
  },
});

async function indexDocumentWithField(indexName, sourcePath, document) {
  try {
    const files = await fs.promises.readdir(sourcePath);
    console.log(files);
    for (let index = 0; index < files.length; index++) {
      const fileName = files[index];

      const filePath = `${sourcePath}\\${fileName}`;
      const text = await extractTextFromPDF(filePath);
      const result = await client.index({
        index: indexName,
        body: {
          model: document.model,
          year: document.year,
          manufacturer: document.manufacturer,
          trim: document.trim,
          revision: document.revision,
          publication_date: document.publicationDate,
          content: text,
        },
      });

      console.log('Document indexed:', result);
    }
  } catch (error) {
    console.error('Error indexing document:', error);
  }
}

const indexName = 'ai-llm';
const modelName = 'Model 3';
const modelYear = 2022;
const modelManufacturer = 'Tesla';
const trim = null;
const revision = null;
const publicationDate = null;
const sourcePath = '.\\source-pdf\\tesla3';

indexDocumentWithField(indexName, sourcePath, {
  model: modelName,
  year: modelYear,
  manufacturer: modelManufacturer,
  trim: trim,
  revision: revision,
  publicationDate: publicationDate,
});
