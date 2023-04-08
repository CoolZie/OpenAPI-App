const { OpenAI } = require("langchain/llms");
const { OpenAIEmbeddings } = require("langchain/embeddings");
const { PineconeClient } = require("@pinecone-database/pinecone");
const { PineconeStore } = require("langchain/vectorstores");
const { OPENAI_API_KEY, PINECONE_API_KEY, PINECONE_ENVIRONMENT, PINECONE_INDEX } = require("../config/config-openapi");
const { VectorDBQAChain } = require("langchain/chains");
const promptQA = async (query) => {
  const client = new PineconeClient();
  await client.init({
    apiKey: PINECONE_API_KEY,
    environment: PINECONE_ENVIRONMENT,
  });
  const pineconeIndex = client.Index(PINECONE_INDEX);
  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings({ openAIApiKey: OPENAI_API_KEY }),
    { pineconeIndex }
  );

  const model = new OpenAI({ openAIApiKey: OPENAI_API_KEY });
  const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
    k: 1,
    returnSourceDocuments: true,
  });
  const response = await chain.call({ query: query });
  console.log(response);
  return response;
};
/* Search the vector DB independently with meta filters */
/* const results = await vectorStore.similaritySearch("pinecone", 1, {
  foo: "bar",
});
console.log(results); */

module.exports = { promptQA };
