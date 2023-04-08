const { OpenAIEmbeddings } = require("langchain/embeddings");
const { OPENAI_API_KEY } = require("../config/config-openapi");
const embeddings = new OpenAIEmbeddings({openAIApiKey:OPENAI_API_KEY});
const { TextLoader } = require("langchain/document_loaders");
const { storeDocument } = require("./pinecone");
const embeddingsFile = async () =>{
    const loader = new TextLoader("/Users/coulibalyzie/Desktop/OpenAPI/ressources/doc1.txt");
    const docs = await loader.load();
    storeDocument(docs).then(e=>{
        console.log(e);
    })
}
module.exports = { embeddingsFile }