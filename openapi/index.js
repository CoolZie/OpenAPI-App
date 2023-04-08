const { OpenAIEmbeddings } = require("langchain/embeddings");
const { OPENAI_API_KEY } = require("../config/config-openapi");
const embeddings = new OpenAIEmbeddings({openAIApiKey:OPENAI_API_KEY});
const fs = require('fs');
const embeddingsFile = async () =>{
    var fileData = "";
    fs.readFile('/Users/coulibalyzie/Desktop/OpenAPI/ressources/doc1.txt', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        emb(data);
      });
}
const emb =  async (data) => {
    const res = await embeddings.embedQuery(data);
    console.log({ res });
}

module.exports = { embeddingsFile }