const express = require('express')
const {OpenAI} = require('langchain')
const { OPENAI_API_KEY } = require('./config/config-openapi')
const { init } = require('./openapi')
const app = express()
const port = 3000


app.get('/', (req, res) => {
  init().then(data => {
    console.log(data);
    res.send(data)
  })
})


//http://localhost:3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})