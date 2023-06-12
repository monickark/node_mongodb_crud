const express = require("express");
const mongoose = require("mongoose");

const { Dog } = require("./models");

const app = express();

app.use(express.json());

app.get("/dogs", async (req, res) => {
  const allDogs = await Dog.find();
  return res.status(200).json(allDogs);
});

app.get("/dogs/:id", async (req, res) => {
  const { id } = req.params;
  const dog = await Dog.findById(id);
  return res.status(200).json(dog);
});

app.post("/dogs", async (req, res) => {
    console.log("request body: "+JSON.stringify(req.body));
  const newDog = new Dog({ ...req.body });
  const insertedDog = await newDog.save();
  return res.status(201).json(insertedDog);
});

app.put("/dogs/:_id", async (req, res) => {
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

app.delete("/dogs/:id", async (req, res) => {
  const { id } = req.params;
  const deletedDog = await Dog.findByIdAndDelete(id);
  return res.status(200).json(deletedDog);
});

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://monickakilan:5xpeNSAGeOOhYUzN@dogschema.4ocrfkv.mongodb.net/?retryWrites=true&w=majority"
    );
    app.listen(3000, () => console.log("Server started on port 3000"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();