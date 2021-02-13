const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
require('dotenv').config();

// database connection
const dbURI = process.env.db_UrL;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => console.log("MongoDB database connection established successfully"))
  .catch((err) => console.log(err));

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});