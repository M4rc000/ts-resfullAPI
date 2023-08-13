import express from 'express';
import ItemController from '../controllers/itemController';

const router = express.Router();
const itemController = new ItemController();

router.get('/get', itemController.getAllItems);
router.get('/get/:id', itemController.getItem);
router.put('/update/:id', itemController.updateItem);
router.delete('/delete/:id', itemController.deleteItem);
router.post('/create', itemController.createItem);

// Add aggregation route
router.get('/aggregate', itemController.aggregateItemsBySize);

export default router;
