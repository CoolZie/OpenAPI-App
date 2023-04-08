const { PineconeClient } = require("@pinecone-database/pinecone");
const { OpenAIEmbeddings } = require("langchain/embeddings");
const { PineconeStore } = require("langchain/vectorstores");
const { OPENAI_API_KEY, PINECONE_API_KEY, PINECONE_ENVIRONMENT } = require("../config/config-openapi");

const storeDocument = async (docs) => {
  const client = new PineconeClient();
  await client.init({
    apiKey: PINECONE_API_KEY,
    environment: PINECONE_ENVIRONMENT,
  });
  const pineconeIndex = client.Index("database");

  return await PineconeStore.fromDocuments(
    docs,
    new OpenAIEmbeddings({ openAIApiKey: OPENAI_API_KEY }),
    {
      pineconeIndex,
    }
  )
};

module.exports = { storeDocument };
