const dotenv = require("dotenv")
dotenv.config();
OPENAI_API_KEY = process.env.OPENAI_API_KEY
PINECONE_API_KEY = process.env.PINECONE_API_KEY
PINECONE_ENVIRONMENT = process.env.PINECONE_ENVIRONMENT
PINECONE_INDEX = process.env.PINECONE_INDEX
module.exports = {OPENAI_API_KEY,PINECONE_API_KEY,PINECONE_ENVIRONMENT,PINECONE_INDEX}