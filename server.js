const express = require('express');
require('dotenv').config();
const db = require('./db');
const cors = require('cors');
const path =require ("path")

const app = express();
const port = process.env.PORT || 8000;
app.use(express.json()); // JSON parsing middleware
app.use(express.urlencoded({ extended: true })); // URL-encoded parsing middleware

app.use(cors());

app.use(require('./routes/client'));
app.use(require('./routes/cart'));
// app.use(require('./routes/categories'));
app.use(require('./routes/contact'));
app.use(require('./routes/order'));
app.use(require('./routes/product'));
// app.use(require('./routes/properties'));
// app.use(require('./routes/subscription'));
// app.use(require('./routes/user'));

//serving the frontend
app.use(express.static(path.join(__dirname,"./client/build")))
app.get("*",(req,res)=>{
  res.sendFile(
    path.join(__dirname,"./client/build/index.html"),
    function (err){
      res.status(500).send(err)
    }
  )
})

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
