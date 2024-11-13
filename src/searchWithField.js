require('dotenv').config();
const { Client } = require('@elastic/elasticsearch');

const client = new Client({
  node: process.env.EL_URL,
  auth: {
    apiKey: process.env.EL_KEY,
  },
});

async function searchByFields(indexName, textQuery, doc) {
  try {
    console.log('Prompt:', textQuery);

    const result = await client.search({
      index: indexName,
      body: {
        query: {
          bool: {
            must: [
              { match: { model: doc.model } },
              { match: { year: doc.year } },
              { match: { manufacturer: doc.manufacturer } },
              // { match: { trim: doc.trim } },
              // { match: { revision: doc.revision } },
              // { match: { publication_date: doc.publication_date } },
              { match: { content: textQuery } },
            ],
          },
        },
      },
    });

    console.log(result.hits.hits);
    // result.hits.hits.forEach((hit) => {
    //   console.log('--------------------------------------------------------------');
    //   console.log('Document ID:', hit._id);
    //   console.log('Model:', hit._source.model);
    //   console.log('Manufacturer:', hit._source.manufacturer);
    //   console.log('Year:', hit._source.year);
    //   console.log('Trim:', hit._source.trim);
    //   console.log('Revision:', hit._source.revision);
    //   console.log('--------------------------------------------------------------\n');
    //   console.log('Content Preview:', hit._source.content);
    // });

    return result.hits.hits;
  } catch (error) {
    console.error('Error performing search:', error);
  }
}

const indexName = 'ai-llm';
const modelName = 'Model 3';
const modelYear = 2022;
const modelManufacturer = 'Tesla';
const trim = null;
const revision = null;
const publicationDate = null;

// const prompt = 'I need medcine?';
// const prompt = 'Who are you?';
// const prompt = 'how to add key in tesla model 3?';
// const prompt = 'What about Gen 2 Mobile Connector Status Lights';
// const prompt = 'How is the hitch installed into the hitch housing?';
// const prompt = 'What should you do if the red light flashes three times?';
const prompt = 'What should be done if a short circuit occurs when jump starting Model 3?';
// const prompt = 'How do I power off Model 3?';
// const prompt = 'How can ice be removed from the door handle of Tesla Model 3 if the handles are black?';
// const prompt = 'Where is the windshield washer fluid reservoir located?';
// const prompt = 'how to add key for tesla model S?';
// const prompt = 'How can I power cycle Tesla Model S?';
// const prompt = 'When should the low voltage battery be replaced in Tesla Model S?';
// const prompt = 'What does it mean when the Tesla Model S Gen 2 Mobile Connector shows 1 red flash and no green lights?';
// const prompt = 'How can I replace the key fob battery?';
// const prompt = 'What does the cabin air filter in Tesla Model S prevent from entering the cabin?';
// const prompt = 'How long does the key fob battery last?';
// const prompt = 'What should be done after replacing the wiper blades?';
// const prompt = 'What should I do if I see a screen called "Train the receiver" while programming the device?';
// const prompt = 'Where can replacement wiper blades be purchased?';

searchByFields(indexName, prompt, {
  model: modelName,
  year: modelYear,
  manufacturer: modelManufacturer,
  trim: trim,
  revision: revision,
  publication_date: publicationDate,
});
