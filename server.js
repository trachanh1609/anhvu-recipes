const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config({path: 'variables.env'});

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('DB connected');
})
.catch(err=> {
    console.error(err);
})

const PORT = process.env.PORT || 5000 ;

app.listen(PORT, ()=> {
    console.log('Server listening on port', PORT);
})

