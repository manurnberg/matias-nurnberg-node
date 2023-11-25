const express = require('express')
const morgan = require('morgan')


const app = express();
// middlewares
app.use(express.json());
app.use('/', require('./routes/mutation.routes'));
app.use(morgan("dev"));

app.get('/', (req, res) =>{
    res.send('this is express');
})

module.exports = app;



