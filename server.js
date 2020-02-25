const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
var path = require('path');


const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", { useNewUrlParser: true });



app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + './public/index.html'));
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname + '/public/exercise.html'));
});


app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname + '/public/stats.html'));
});


app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
  .then(dbWorkout => {
    res.json(dbWorkout); 
  })
  .catch(err => {
    res.json(err); 
  }); 
}); 

app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
  .then(dbWorkouts => {
    res.json(dbWorkouts); 
  })
  .catch(err => {
    res.json(err); 
  }); 
});


app.put("/api/workouts/:id", (req, res) => {
  db.Workout.updateOne({_id: req.params.id}, {$push: {"exercises": req.body }})
    .then(dbWorkout=> {
      res.json(dbWorkout); 
    })
    .catch(err => {
      res.json(err); 
    })
})




app.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(body)
    .then((dbWorkout => {
      res.json(dbWorkout)
    })
    .catch(err=> {
      res.json(err); 
    })
  )
})


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});




// let exercise = [
//   { 
//     type: "upper"
//   }, {
//     name: "bench"
//   }, { 
//     duration: 10
//   }, {
//     wieght: 150
//   }, {
//     reps: 4
//   }, {
//     sets: 3
//   }, {
//     distance: 3
//   }
// ]










// app.get("/exercise/:name", (req, res) => {
//   res.sendFile(path.join(__dirname + '/Develop/public/stats.html'));
// });



//   .then(({_id}) => db.Workout.findOneAndUpdate({}, { $push: { books: _id } }, { new: true }))
//   .then(dbLibrary => {
//     res.json(dbLibrary);
//   })
//   .catch(err => {
//     res.json(err);
//   });
// });


//   .then(dbWorkout => {
//     res.json(dbWorkout); 
//   })
//   .catch(err => {
//     res.json(err); 
//   }); 
// });

