const { OpenAIEmbeddings } = require("langchain/embeddings");
const { OPENAI_API_KEY } = require("../config/config-openapi");
const embeddings = new OpenAIEmbeddings({openAIApiKey:OPENAI_API_KEY});
const { TextLoader, PDFLoader } = require("langchain/document_loaders");
const { storeDocument } = require("./pinecone");

const embeddingsFileTxt = async () =>{
    const loader = new TextLoader("/Users/assiajeanngoran/Desktop/Tech_Republic/openapi_app/uploads/doc.txt");
    const docs = await loader.load();
    storeDocument(docs).then(e=>{
        console.log(e);
    })
}
const embeddingsFilePDF = async () =>{
    const loader = new PDFLoader("/Users/assiajeanngoran/Desktop/Tech_Republic/openapi_app/uploads/doc.pdf");
    const docs = await loader.load();
    storeDocument(docs).then(e=>{
        console.log(e);
    })
}
module.exports = { embeddingsFileTxt,embeddingsFilePDF }