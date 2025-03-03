const dotenv = require('dotenv');
dotenv.config();
const express = require('express')
const app = express()
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/user.routes');
const catainRoutes = require('./routes/catain.routes');

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(cors())
const connectDB = require('./config/db');
connectDB();    // Connect to MongoDB

app.use('/user', userRoutes);
app.use('/captain',catainRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
