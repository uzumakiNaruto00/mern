const { Router } = require('express');
const router = Router(); 
const traineeController = require('../controllers/TraineeController');

// Get all trainees
router.get('/',traineeController.getAll)

// Create a new trainee
router.post('/',traineeController.create)

// Get trainee By ID
router.get('/:id',traineeController.getById)

// Update trainee By ID
router.put('/:id',traineeController.update)

// Delete trainee By ID
router.delete('/:id',traineeController.Delete)

module.exports = router