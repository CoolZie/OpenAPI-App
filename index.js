const express = require("express");
const { promptQA } = require("./openapi/prompt");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const multer  = require('multer');
const { embeddingsFileTxt,embeddingsFilePDF } = require("./openapi/loaderFileTxt");
var path = require('path')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, "doc" + path.extname(file.originalname)) 
    }
  })
const upload = multer({ storage: storage })

const port = 3000;

app.get("/", async (req, res) => {
  res.send("Welcome")
});

app.post('/files/add', upload.single('fichier'), async function (req, res) {
    if(req.file.originalname.includes(".pdf")){
        embeddingsFilePDF()
    }
    if(req.file.originalname.includes(".txt")){
        embeddingsFileTxt()
    }
})

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
