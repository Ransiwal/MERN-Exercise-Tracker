const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());    // parse json

const uri = process.env.ATLAS_URI;

try {
  mongoose.connect(uri,
  () => console.log("Mongoose is connected")
); 
}
catch(e) {
  console.log("Cant connect")
}

// mongoose.connect(uri)
// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log("MongoDB database connection established successfully");
// })

const User = require('./models/user.model');

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
