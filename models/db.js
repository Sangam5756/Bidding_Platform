import mysql from "mysql";

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",

  database: "bidding_platform",
});


conn.connect((err) => {
  if (err) {
    console.error("Connection Not Established err in DB");
    return;
  }
  console.log("Connection established");
});

const createDatabase = () => {
  const sql = "CREATE DATABASE IF NOT EXISTS bidding_platform";
  conn.query(sql, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Database created or exists");
  });
};

const createUserTable = () => {
  const sql = `
          CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            role VARCHAR(50) DEFAULT 'user',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
      `;

  conn.query(sql, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("User table created or exists");
  });
};

const createItemsTable = () => {
  const sql = `
          CREATE TABLE IF NOT EXISTS items (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            starting_price DECIMAL(10, 2) NOT NULL,
            current_price DECIMAL(10, 2) DEFAULT 0.00,
            image_url VARCHAR(255) NULL,
            end_time TIMESTAMP NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
      `;

  conn.query(sql, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Items table created or exists");
  });
};

const createBidsTable = () => {
  const sql = `
          CREATE TABLE IF NOT EXISTS bids (
            id INT AUTO_INCREMENT PRIMARY KEY,
            item_id INT,
            user_id INT,
            bid_amount DECIMAL(10, 2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (item_id) REFERENCES items(id),
            FOREIGN KEY (user_id) REFERENCES users(id)
          )
      `;

  conn.query(sql, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Bids table created or exists");
  });
};

const createNotificationsTable = () => {
  const sql = `
          CREATE TABLE IF NOT EXISTS notifications (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            message VARCHAR(255) NOT NULL,
            is_read BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
          )
      `;

  conn.query(sql, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Notifications table created or exists");
  });
};

// Insert functions
const insertUser = (username, password, email, role = 'user') => {
  const sql = `INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)`;
  conn.query(sql, [username, password, email, role], (err, results) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("User inserted with ID: ", results.insertId);
  });
};

const insertItem = (name, description, startingPrice, currentPrice, imageUrl, endTime) => {
  const sql = `INSERT INTO items (name, description, starting_price, current_price, image_url, end_time) VALUES (?, ?, ?, ?, ?, ?)`;
  conn.query(sql, [name, description, startingPrice, currentPrice, imageUrl, endTime], (err, results) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Item inserted with ID: ", results.insertId);
  });
};

const insertBid = (itemId, userId, bidAmount) => {
  const sql = `INSERT INTO bids (item_id, user_id, bid_amount) VALUES (?, ?, ?)`;
  conn.query(sql, [itemId, userId, bidAmount], (err, results) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Bid inserted with ID: ", results.insertId);
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


 const findUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM users WHERE username = ?`;
    conn.query(sql, [username], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]);
      }
    });
  });
};

 const findUserById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM users WHERE id = ?`;
    conn.query(sql, [id], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]);
      }
    });
  });
};


 const getAllItems = (callback) => {
  const sql = 'SELECT * FROM items';
  conn.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      callback(err, null);
      return;
    }
    callback(null, results);
  });
};

const getItemById = (id, callback) => {
  const sql = 'SELECT * FROM items WHERE id = ?';
  conn.query(sql, [id], (err, results) => {
    if (err) {
      console.error(err);
      callback(err, null);
      return;
    }
    callback(null, results[0]); // Assuming IDs are unique, results[0] should be the item
  });
};

const updateItem = (id, name, description, starting_price, current_price, image_url, end_time, callback) => {
  const sql = `
    UPDATE items
    SET name = ?, description = ?, starting_price = ?, current_price = ?, image_url = ?, end_time = ?
    WHERE id = ?
  `;
  conn.query(sql, [name, description, starting_price, current_price, image_url, end_time, id], (err) => {
    if (err) {
      console.error(err);
      callback(err);
      return;
    }
    callback(null);
  });
};
 const deleteItem = (id, callback) => {
  const sql = 'DELETE FROM items WHERE id = ?';
  conn.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Export all functions
export {
  findUserById,
  deleteItem,
  updateItem,
  getItemById,
  findUserByUsername,
  createDatabase,
  createUserTable,
  createItemsTable,
  createBidsTable,
  getAllItems,
  createNotificationsTable,
  insertUser,
  insertItem,
  insertBid,
  insertNotification,
  
  conn
};

// Usage Example (Uncomment to run)
createDatabase();
createUserTable();
createItemsTable();
createBidsTable();
createNotificationsTable();

// Insert example data (Uncomment to run)
// insertUser('username1', 'password1', 'email1@example.com');
// insertItem('Item 4', 'Description of Item 1', 100.00, 100.00, 'image_url_1', '2024-12-31 23:59:59');
// insertBid(1, 1, 120.00);
// insertNotification(1, 'You have been outbid');
