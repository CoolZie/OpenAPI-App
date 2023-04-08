const express = require("express");
const { promptQA } = require("./openapi/prompt");
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: '*'
}));
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

const port = 3500;

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
    console.log(req.body.ask);
    let result = promptQA(req.body.ask);

    result.then(r=>{
        res.send({
          "response":r.text
        });
    })
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
