// controllers/itemController.js

import { getAllItems as fetchAllItems, getItemById as fetchItemById ,updateItem as updateItemInDB,deleteItem as deleteItemFromDB } from '../models/db.js'; // Ensure correct path

export const getAllItems = (req, res) => {
  fetchAllItems((err, items) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error retrieving items');
    }
    res.render('items', { items }); // Render the items view with the items data
  });
};

export const updateform = (req,res) =>{
  
  const { id } = req.params;
  fetchItemById(id, (err, item) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error retrieving item');
    }
    if (!item) {
      return res.status(404).send('Item not found');
    }
    res.render('itemupdate', { item }); // Render the item view with the item data
  });
};

export const getItemById = (req, res) => {
  const { id } = req.params;
  const user = req.user;
  fetchItemById(id, (err, item) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error retrieving item');
    }
    if (!item) {
      return res.status(404).send('Item not found');
    }
    const isOwner = user && item.owner_id === user.id;
    const isAdmin = user && user.role === 'admin';
    res.render('itemsShow', { item, user, isOwner, isAdmin }); // Render the item view with the item data
  });
};





export const updateItem = (req, res) => {
  const itemId = req.params.id;
  const { name, description, starting_price, current_price, image_url, end_time } = req.body;

  // Update the item in the database
  updateItemInDB(itemId, name, description, starting_price, current_price, image_url, end_time, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error updating item');
    }
    res.redirect(`/items/${itemId}`); // Redirect to the updated item page
  });
};


export const deleteItem = (req, res) => {
  const { id } = req.params;
  
  deleteItemFromDB(id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error deleting item');
    }
    res.redirect('/items'); // Redirect to a page displaying all items after deletion
  });
};