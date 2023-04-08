const express = require("express");
const { OpenAI } = require("langchain");
const { OPENAI_API_KEY } = require("./config/config-openapi");
const {  embeddingsFile } = require("./openapi");
const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  const model = new OpenAI({ openAIApiKey:OPENAI_API_KEY, temperature: 0.9 });
  const response = await model.call(
    "What would be a good company name a company that makes colorful socks?"
  ).then(r=>{
    res.send(r);
  });
});
app.get("/embemdeFile", (req, res) => {
    embeddingsFile()
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
