const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "config", ".env") });
const cors = require("cors");
const connectDatabase = require("./config/connectDatabase");

connectDatabase();

app.use(express.json());
app.use(cors());


// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the e-commerce platform!');
});

// Routes
app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/products', require('./routes/productsRoute'));



app.listen(process.env.PORT, () => {
  console.log(
    `Server listening to Port ${process.env.PORT}`
  );
});
