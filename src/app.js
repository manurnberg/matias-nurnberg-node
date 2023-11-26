const express = require('express');
const morgan = require('morgan');

const app = express();


// Settings -----------------------------------------------------------------------
process.env.TZ = 'America/Buenos_Aires';
app.set('tz', process.env.TZ || 'America/Buenos_Aires');
console.log("TimeZone: " + process.env.TZ + " -> " + new Date());


// middlewares --------------------------------------------------------------------
app.use(express.json());
app.use('/', require('./routes/mutation.routes'));
app.use(morgan("dev"));

app.get('/', (req, res) =>{
    res.send('this is express');
})

module.exports = app;



