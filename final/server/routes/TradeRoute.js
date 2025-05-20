const { Router } = require('express');
const router = Router(); 
const tradeController = require('../controllers/TradeController');


// Get all Trades
router.get('/', tradeController.getAllTrades)

// Create a new Trade
router.post('/', tradeController.createTrade)

// Get Trade By ID
router.get('/:id', tradeController.getTradeById)

// Update Trade By ID
router.put('/:id', tradeController.updateTradeById)

// Delete Trade By ID
router.delete('/:id', tradeController.deleteTradeById)

module.exports = router