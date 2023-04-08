const express = require('express')
const { example } = require('./openapi')
const app = express()
const port = 3000


app.get('/', (req, res) => {
    example().then(data=>{
        console.log(data);
        res.send(data)
    })
  
})


//http://localhost:3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})