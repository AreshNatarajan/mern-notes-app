const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv')
const path = require('path')
const app = express();
const cors = require('cors')
const connection = require('./config/connectionDB')
//configure
dotenv.config({path : path.join(__dirname, 'config', 'config.env') });

//routes
const createNotesRoute = require(path.join(__dirname,'routes', 'createNotesRoute'));
const deleteNotesRoute = require(path.join(__dirname, 'routes' ,'deleteNotesRoute'))
const editNotesRoute = require(path.join(__dirname, 'routes', 'editNotesRoute'));
const readNotesRoute = require(path.join(__dirname, 'routes', 'readNotesRoute' ))
const updateFinishedRouter =  require(path.join(__dirname, 'routes', 'updateFinishedRouter'))

connection();
app.use(cors());
app.use(express.json())
app.use('/notes/api', createNotesRoute )
app.use('/notes/api', deleteNotesRoute )
app.use('/notes/api', editNotesRoute)
app.use('/notes/api', readNotesRoute )
app.use('/notes/api', updateFinishedRouter)

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT} 🔥`)
);

