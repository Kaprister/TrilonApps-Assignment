import dotenv from "dotenv";
import connectDB from "./config/database.js";
import {app} from "./app.js";
// dotenv.config({path: './.env'});
dotenv.config();
const PORT = process.env.PORT || 5400;


app.get('/', (req, res) => {
    console.log("Hello Trilon");
})


// connectDB().then(() => {
//     app.listen(PORT, () => {
//         console.log(`App is listening on ${PORT}`);
//     });
// }).catch((err) => {
//     console.log("MongoDB connection Failed !!!  " + err)
// })


app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
})
connectDB().then(() => {
    console.log("Database connection Successfully!");
}).catch((err) => {
    console.log("MongoDB connection Failed !!!  " + err)
})