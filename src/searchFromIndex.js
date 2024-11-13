require('dotenv').config();
const { Client } = require('@elastic/elasticsearch');

const client = new Client({
  node: process.env.EL_URL,
  auth: {
    apiKey: process.env.EL_KEY,
  },
});

async function searchInElasticsearch(indexName, searchText) {
  try {
    const result = await client.search({
      index: indexName,
      body: {
        query: {
          match: {
            content: searchText,
          },
        },
      },
    });

    console.log('Search Results:', result.hits.hits);
    return result.hits.hits;
  } catch (error) {
    console.error('Error searching in Elasticsearch:', error);
  }
}

searchInElasticsearch('llm-trainer', 'add key in tesla for tesla model3');
