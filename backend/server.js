const express = require('express');
const colors = require('colors')
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware');
const {connectDB} = require('./config/db.js')

const SERVERPORT = process.env.PORT || 8080

//connect to Database
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler);

app.listen(SERVERPORT, () =>  {console.log('Server started on port ' + SERVERPORT)})