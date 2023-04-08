const express = require("express");
const { OpenAI } = require("langchain");
const { OPENAI_API_KEY } = require("./config/config-openapi");
const { embeddingsFile } = require("./openapi/loaderFileTxt");
const { promptQA } = require("./openapi/prompt");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
app.post("/prompt", (req, res) => {
    console.log(req.body.prompt);
    let result = promptQA(req.body.prompt);
    result.then(r=>{
        res.send(r.text);
    })
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
