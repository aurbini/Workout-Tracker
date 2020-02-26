require("dotenv").config()
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
var routes = require('./routes');


const PORT = process.env.PORT || 3000;


const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
const mongoURI = process.env.MONGODB_URI || "mongodb://localhost/workoutdb"

mongoose.connect(mongoURI, { useNewUrlParser: true });


app.use(routes.html); 
app.use(routes.api); 


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});




// ![MongoDB_URI](images/MONGODB_URI.png)