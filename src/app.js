const express = require('express');
const connectDB = require('./db/connect');
require('dotenv').config();

// init express
const app = express();

// middleware
app.use(express.json());

// routes
const userRoutes = require("./routes/user.route")
app.use('/api/v1/users', userRoutes);


const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_DB_URI)
        app.listen(port, () => console.log(`listening to port ${port} ...`))
    } catch (err) {
        console.log(err);
    };
};

start();
