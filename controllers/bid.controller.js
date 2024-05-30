import {conn} from "../models/db.js"

// Retrieve all bids for a specific item
const getAllBids = (req, res) => {
    const { itemId } = req.params;
    const sql = 'SELECT * FROM bids WHERE item_id = ?';

    conn.query(sql, [itemId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Server error', error: err });
        }
        res.json(results);
    });
};

// Place a new bid on a specific item
const placeBid = (req, res) => {
    const { itemId } = req.params;
    const { bid_amount } = req.body;
    const userId = req.user.id; // Assuming user ID is added to req by auth middleware

    const sqlInsert = 'INSERT INTO bids (item_id, user_id, bid_amount) VALUES (?, ?, ?)';
    
    conn.query(sqlInsert, [itemId, userId, bid_amount], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Server error', error: err });
        }
        res.status(201).json({ message: 'Bid placed successfully', bidId: results.insertId });
    });
};

  
  const insertNotification = (userId, message, isRead = false) => {
    const sql = `INSERT INTO notifications (user_id, message, is_read) VALUES (?, ?, ?)`;
    conn.query(sql, [userId, message, isRead], (err, results) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Notification inserted with ID: ", results.insertId);
    });
  };
  


export  {
    getAllBids,
    placeBid
};
