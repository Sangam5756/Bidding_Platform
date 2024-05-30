import express from "express";
import path from "path";
import {conn} from "./models/db.js"
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import dotenv, { config } from "dotenv";

dotenv.config();


import userRoutes from "./routes/user.routes.js"
import itemRoutes from "./routes/items.route.js"
// import bidRoutes from "./routes/bids.route.js"

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const PORT = 5000  || process.env.PORT;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(methodOverride("_method"));


app.use("/users", userRoutes);
app.use("/items", itemRoutes);



app.listen(PORT, (req, res) => {
  console.log(`server is running on port ${PORT}`);

});

























// app.get("/users/profile",(req,res) =>{
//     res.send(" User profile");
// })

// app.get("/items",(req,res) =>{
//     res.send(" All Items");
// })

// app.get("/items/:id",(req,res) =>{
//     res.send("items by id");
// })

// app.put("/items/:id",(req,res)=>{
//     console.log("update route for the items")
// });

// app.delete("/items/:id",(req,res)=>{
//     console.log("delete route for items");
// })

// // Route for the bids
// app.get("/items/:itemId/bids",(req, res) =>{
//     res.send("Bid for specific id");
// })

// app.post("items/:itemid/bids",(req,res) =>{
//     res.send("bid is placed");
// })



