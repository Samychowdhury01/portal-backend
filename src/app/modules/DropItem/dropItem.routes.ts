import { Router } from 'express';
import { DropItemsControllers } from './dropItem.controller';

const router = Router();

// create drop item
router.post('/', DropItemsControllers.createDropItem);
router.get('/', DropItemsControllers.getDropItems);
router.put('/', DropItemsControllers.updateItems);
router.put('/order', DropItemsControllers.updateItemsOrder);
router.delete('/:id', DropItemsControllers.deleteItem);

export const DropItemRouter = router;
