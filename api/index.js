const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')
const authRouter = require('./Routes/AuthRoutes')
require('dotenv').config();

const app = express();

app.use(cors({
    origin: ["https://regal-kataifi-209546.netlify.app",
        "https://regal-kataifi-209546.netlify.app/login",
        "http://localhost:3000", "https://regal-kataifi-209546.netlify.app/signup",
        "https://regal-kataifi-209546.netlify.app/checkout",
        "https://regal-kataifi-209546.netlify.app/success",
        "https://regal-kataifi-209546.netlify.app/cancel"
    ], credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello world');
})

mongoose.set('strictQuery', true);

const URL = process.env.DATABASE_URL;

mongoose
    .connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB Connetion Successfull, Happy Coding!");
    })
    .catch((err) => {
        console.log(err.message);
    });

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
})


app.use('/', authRouter)


// .connect("mongodb://localhost:27017/auth_mern", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })