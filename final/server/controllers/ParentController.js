const mongoose = require('mongoose');
const Parent = require('../models/Parent');


async function getAll(req, res){
    try {
        const parents = await Parent.find()
        res.send(parents)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function create(req,res) {
    try {
        let parent = new Parent(req.body)
        const savedParent = await parent.save()
        res.send(savedParent)
    } catch (error) {
        res.status(500).send(error.message)
    }
}
async function getById(req,res) {
    try {
        const parent = await Parent.findById(req.params.id)
        res.send(parent)
    } catch (error) {
        res.status(500).send(error.message)
    }
}
async function update(req,res) {
    try {
        const parent = await Parent.findByIdAndUpdate(req.params.id,req.body,{new: true})
        res.send(parent)
    } catch (error) {
        res.status(500).send(error.message)
    }
}
async function Delete(req,res) {
 try {
        const parent = await Parent.findByIdAndDelete(req.params.id)
        res.send(parent).json({message: 'Parent Deleted'})
    } catch (error) {
        res.status(500).send(error.message)
    }
}


module.exports = {
    getAll,
    create,
    getById,
    update,
    Delete
}