const Trade = require('../models/Trade');


// Get all Trades
async function getAllTrades(req, res) {
    try {
        const trades = await Trade.find()
        res.send(trades)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

// create a new Trade

async function createTrade(req, res) {
    try {
        let trade = new Trade(req.body)
        trade = await trade.save()
        res.send(trade)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

// Get Trade By ID
async function getTradeById(req, res) {
    try {
        const trade = await Trade.findById(req.params.id)
        res.send(trade)
    } catch (error) {
        res.status(500).send(error.message)
    }
}
// Update Trade By ID
async function updateTradeById(req, res) {
    try {
        const trade = await Trade.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.send(trade).json({message: 'Trade Updated'})
    }
    catch (error) {
        res.status(500).send(error.message)
    }
}
// Delete Trade By ID
async function deleteTradeById(req, res) {
    try {
        const trade = await Trade.findByIdAndDelete(req.params.id)
        res.send(trade).json({message: 'Trade Deleted'})
    } catch (error) {
        res.status(500).send(error.message)
    }
}


module.exports = {
    getAllTrades,
    createTrade,
    getTradeById,
    updateTradeById,
    deleteTradeById
}