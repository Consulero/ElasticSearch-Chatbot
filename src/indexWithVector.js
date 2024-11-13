const { extractTextFromPDF, indexTextInElasticsearch } = require('./indexData');
const { PDFLoader } = require('@langchain/community/document_loaders/fs/pdf');
const { RecursiveCharacterTextSplitter } = require('langchain/text_splitter');

async function uploadPDFToElasticsearch(filePath, indexName, documentId) {
  try {
    const pdfLoader = new PDFLoader(filePath);
    const docs = await pdfLoader.load();

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const chunks = await splitter.splitDocuments(
      docs.map((doc) => ({
        pageContent: doc.pageContent,
        metadata: doc.metadata || {}, // include metadata if needed
      }))
    );

    console.log('Chunks generated: ', chunks);
  } catch (error) {
    console.error('Error uploading PDF content:', error);
  }
}

const filePath = '.\\source-pdf\\adding and removing keys.pdf';
const indexName = 'llm-trainer';
const docId = 'doc_2';

uploadPDFToElasticsearch(filePath, indexName, docId);
