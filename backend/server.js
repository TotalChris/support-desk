const express = require('express');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware')

const SERVERPORT = process.env.PORT || 8080
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler);

app.listen(SERVERPORT, () =>  {console.log('Server started on port ' + SERVERPORT)})