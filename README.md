# Project Setup Guide

Follow these steps to set up and run the project on your local machine.

## Step 1: Download Project

Download the project files as a ZIP file from the GitHub repository.

## Step 2: Open in Code Editor

Open the downloaded project folder in your preferred code editor, such as Visual Studio Code.

## Step 3: Set Up MySQL Server

Start your MySQL server or use XAMPP. Provide your MySQL server's username and password in the `models/db.js` file.

## Step 4: Install Dependencies

Open a terminal in the project directory and run the following command to install the necessary dependencies:

```bash
npm install
```

# Step 5: Start the Server
In the terminal, run the following command to start the server using nodemon:
 ```bash
nodemon app.js

```
# Accessing Routes

# User Routes
<ul>
      <li><strong>Login:</strong> Access the login page at <a href="http://localhost:5000/users/login">localhost:5000/users/login</a>.</li>
      <li><strong>Register:</strong> Register as a new user at <a href="http://localhost:5000/users/register">localhost:5000/users/register</a>.</li>
      <li><strong>Profile:</strong> After logging in, you will be redirected to your profile page at <a href="http://localhost:5000/users/profile">localhost:5000/users/profile</a>.</li>
    </ul>
    
# Item Routes

<ul>
  <li><strong>View All Items:</strong> See all items visible to any visitor of the site at <a href="http://localhost:5000/items">localhost:5000/items</a>.</li>
  <li><strong>View Specific Item:</strong> View details of a specific item by replacing <code>:id</code> with the item's ID at <a href="http://localhost:5000/items/itemid">localhost:5000/items/itemid</a>.</li>
  <ul>
     <li><strong>Create Item:</strong> Only authorized users can create an item by sending a POST request to <a href="http://localhost:5000/items/new">localhost:5000/items/new</a>.</li>
    <li><strong>Update Item:</strong> Only authorized users can update an item by sending a POST request to <a href="http://localhost:5000/items/itemid">localhost:5000/items/itemid</a>.</li>
    <li><strong>Delete Item:</strong> Only authorized users can delete an item by sending a DELETE request to <a href="http://localhost:5000/items/itemid">localhost:5000/items/itemid</a>.</li>
  </ul>
</ul>
# Bid Routes

<ul>
  <li><strong>View All Bids:</strong> See all bids for a specific item by replacing <code>:id</code> with the item's ID at <a href="http://localhost:5000/items/:id/bids">localhost:5000/items/:id/bids</a>.</li>
  <li><strong>Place Bid:</strong> Only authorized users can place a bid for a specific item by sending a request to <a href="http://localhost:5000/items/:id/placebid">localhost:5000/items/:id/placebid</a>.</li>
</ul>
