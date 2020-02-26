var express = require("express"); 
var router = express.Router(); 
const db = require("../models");



router.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then(dbWorkouts => {
      res.json(dbWorkouts); 
    })
    .catch(err => {
      res.json(err); 
    }); 
});

router.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
  .sort({"day": 1})
  .then(dbWorkout => {
    res.json(dbWorkout); 
  })
  .catch(err => {
    res.json(err); 
  }); 
}); 


router.post("/api/workouts", ({ body }, res) => {
  console.log('complete exercise clicked')
  console.log(body)
  const workout = new db.Workout(); 
  db.Workout.create(workout)
    .then((dbWorkout => {
      console.log(dbWorkout); 
      res.json(dbWorkout)
     })
    .catch(err=> {
      res.json(err); 
    })
  )
})

router.put("/api/workouts/:id", ( {body, params}, res) => {
 // console.log(req.body); 
 // console.log(req.params.id); 
 var query = { _id: params.id }
  console.log('add exercise button is cicked')
  db.Workout.findOneAndUpdate(query, 
    { $push: { exercises: [body] }
    }, function(err, dbWorkout) {
      if(err){
        res.json(err); 
      }else {
        res.json(dbWorkout); 
      }
    })
})



module.exports = router; 