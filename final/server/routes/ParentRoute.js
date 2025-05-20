const { Router } = require('express');
const router = Router(); 
const ParentController = require('../controllers/ParentController'); 

router.get('/',ParentController.getAll);
router.post('/',ParentController.create)
router.get('/:id',ParentController.getById)
router.put('/:id',ParentController.update)
router.delete('/:id',ParentController.Delete)

module.exports = router