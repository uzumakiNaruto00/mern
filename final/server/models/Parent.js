const mongoose = require('mongoose');

const ParentSchema = new mongoose.Schema({
    parentNationalId: {type:Number,required: true},
    firstname: {type:String ,required: true},
    lastname: {type:String ,required: true},
    gender: {type:String ,required: true},
    district: {type:String ,required: true},
    phone: {type:Number,required: true}
},{
    timestamps: true,
});

const Parent = mongoose.model('Parent', ParentSchema)

module.exports = Parent