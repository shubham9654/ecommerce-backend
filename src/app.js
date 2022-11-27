const express = require('express');
const connectDB = require('./db/connect');
require('dotenv').config();

const app = express();

// middleware
app.use(express.json());

// routes
app.use('/api/v1/', (req, res) => {
  res.send(200, "hello world")
});

const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_DB_URI)
        app.listen(port, () => console.log(`listening to 3000 port ...`))
    } catch (err) {
        console.log(err);
    };
};

start();
