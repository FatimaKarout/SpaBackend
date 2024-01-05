require('dotenv').config()
const express = require ("express")
const app = express()
const Port = 5000
const connectedToDatabase = require ("./config/config")
app.listen (Port,() => {
connectedToDatabase() 
console.log('server running')} )



