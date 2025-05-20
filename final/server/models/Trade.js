const mongoose = require('mongoose');

const TradeSchema = new mongoose.Schema({
    name: {type:String,required:true},
},{
    timestamps: true,
});

const Trade = mongoose.model('Trade', TradeSchema)

module.exports = Trade