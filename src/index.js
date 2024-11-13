const { extractTextFromPDF, indexTextInElasticsearch } = require('./indexData');

async function uploadPDFToElasticsearch(filePath, indexName, documentId) {
  try {
    const text = await extractTextFromPDF(filePath);

    await indexTextInElasticsearch(indexName, documentId, text);
    console.log('PDF content uploaded to Elasticsearch successfully.');
  } catch (error) {
    console.error('Error uploading PDF content:', error);
  }
}

const filePath = '.\\source-pdf\\tesla3\\adding and removing keys.pdf';
const indexName = 'llm-trainer';
const docId = 'doc_2';

uploadPDFToElasticsearch(filePath, indexName, docId);
