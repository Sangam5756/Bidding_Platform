import express from "express";
import { getAllItems, getItemById, updateItem, deleteItem ,updateform} from "../controllers/items.controller.js";
import { authenticate,checkOwnershipOrAdmin  } from '../middlewares/auth.js';
import {getAllBids,placeBid }  from "../controllers/bid.controller.js"

const router = express.Router();
// items
router.get('/',  getAllItems);

router.get('/:id/update', authenticate, updateform);

// show route specific for items
router.get('/:id', getItemById); // Protect the /items/:id route

// update route
router.post('/:id/update', authenticate, updateItem); // Protect the /items/:id route for updating


// delete item route
router.delete('/:id', authenticate, deleteItem); // Protect the /items/:id route for deleting



router.get('/:itemId/bids', getAllBids);
router.get('/:itemId/bids/new', authenticate, (req, res) => {
    res.render('items/placeBid', { itemId: req.params.itemId });
});
router.post('/:itemId/bids', authenticate, placeBid);


export default router;