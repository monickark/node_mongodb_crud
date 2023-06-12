const express = require("express")
const {Dog} = require("./models") 
const router = express.Router()

// Get all dogs
router.get("/dogs", async (req, res) => {
  const allDogs = await Dog.find();
  return res.status(200).json(allDogs);
});

router.get("/dogs/:id", async (req, res) => {
  const { id } = req.params;
  const dog = await Dog.findById(id);
  return res.status(200).json(dog);
});

router.post("/dogs", async (req, res) => {
  console.log("request body: "+JSON.stringify(req.body));
  const newDog = new Dog({ ...req.body });
  const insertedDog = await newDog.save();
  return res.status(201).json(insertedDog);
});

router.put("/dogs/:_id", async (req, res) => {
  try {
    const { _id } = req.params;  
    console.log("request body: "+JSON.stringify(req.body));
    console.log("update started : "+ _id);
    let id1 = parseInt(_id);
    await Dog.findByIdAndUpdate({ _id }, req.body);    
    console.log("update completed");
    const updatedDog = await Dog.findById({_id});
    console.log("retrieve updated data");
    return res.status(200).json(updatedDog);
  } catch(err){
    console.log("Update failed: "+ err);
  }
});

router.delete("/dogs/:id", async (req, res) => {
  const { id } = req.params;
  const deletedDog = await Dog.findByIdAndDelete(id);
  return res.status(200).json(deletedDog);
});

module.exports = router