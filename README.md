<!-- Here To Start the project -->
Step 1  - Download zip file for the git
step 2  - open in code editor vscode or any
step 3  - start the my sql server or use XAMPP give their userid password in models/db.js
step 4  - open terminal in same directory of file run npm install
step 5  - start the server type - nodemon app.js

Now You Ready To Go 

<!-- USERS -->

localhost:5000/users/login    - > for the login
localhost:5000/users/register    - > for the new user
localhost:5000/users/profile    - > after login automatically redirect to this page

<!-- ITEMS -->

localhost:5000/items    - > it can visible to any one visiting site
localhost:5000/items/:id    - > viewing the specific item (GET)
localhost:5000/items/:id    - > update only authorize user can do that  (POST request)
localhost:5000/items/:id    - > Delete only authorize user can do that (DELETE Request)

<!-- BIDS -->

localhost:5000/items/:id/bids - > All bids  any one can see this 
localhost:5000/items/:id/placebod - > placing the bids only Authorize user can place the bid







