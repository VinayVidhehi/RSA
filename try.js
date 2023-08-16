const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();

app.use(bodyParser.json());
app.use(cors());


app.get("/", async (req, res, next) => {        
  mongoose
  .connect("mongodb+srv://Vinay:4556@Devaraj@cluster0.tpgkfpg.mongodb.net/RSA/Ciphers", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection successfull");
  })
  .catch((error) => {
    console.log("error occured", error);
  });
//mongodb+srv://Vinay:<password>@cluster0.tpgkfpg.mongodb.net/
  try {
      // Find the latest document based on the _id field (assuming ObjectId is used for _id)
      const latestCipher = await Cipher.findOne().sort({ _id: -1 }).limit(1);
      res.json(latestCipher);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  })

app.listen(5000);