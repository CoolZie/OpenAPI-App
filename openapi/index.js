const { OpenAIApi } = require("openai");
const { OPENAI_API_KEY } = require("../config/config-openapi");

const model = new OpenAIApi({ openAIApiKey: OPENAI_API_KEY, temperature: 0.9 });


const example = async ()=> await model.call(
    "What would be a good company name a company that makes colorful socks?"
);
module.exports = {example}