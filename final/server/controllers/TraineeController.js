const Trainee = require("../models/Trainee");

async function getAll(req, res) {
  try {
    const trainees = await Trainee.find();
    res.send(trainees);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
async function create(req, res) {
  try {
    let trainee = new Trainee(req.body);
    trainee = await trainee.save();
    res.send(trainee);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
async function getById(req, res) {
    try {
        const trainee = await Trainee.findById(req.params.id)
        res.send(trainee)
    } catch (error) {
        res.status(500).send(error.message)
    }
}
async function update(req, res) {
    try {
        const trainee = await Trainee.findByIdAndUpdate(req.params.id,req.body,{new: true})
        res.send(trainee)
    } catch (error) {
        res.status(500).send(error.message)
    }
}
async function Delete(req, res) {
    try {
        const trainee = await Trainee.findByIdAndDelete(req.params.id)
        res.send(trainee)
    } catch (error) {
        res.status(500).send(error.message)
    }
}


module.exports ={
    getAll,
    create,
    getById,
    update,
    Delete
}