const mongoose = require('mongoose');

const TraineeSchema = new mongoose.Schema({
    firstname: {type:String,required:true},
    lastname: {type:String,required:true},
    gender: {type:String,required:true},
    level: {type:String,required:true},
    dob: {type:Date ,required:true},
    parentId:{ type: mongoose.Schema.Types.ObjectId, ref:'Parent'},
    tradeId:{ type: mongoose.Schema.Types.ObjectId, ref:'Trade'}
},{
    timestamps: true,
});

const Trainee = mongoose.model('Trainee', TraineeSchema)

module.exports = Trainee