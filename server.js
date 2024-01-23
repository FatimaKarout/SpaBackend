require('dotenv').config()
const express = require ("express")
const app = express()
const PORT = process.env.PORT
const cors =require('cors')
const bodyParser = require('body-parser')
app.use(cors())
app.use(bodyParser.json())
const connectedToDatabase = require ("./config/config")
const userRoute = require("./Routes/userRoute")
const appointmentRoute =require ("./Routes/appoitmentRoute")
const serviceRoute= require ("./Routes/serviceRoute")
app.use ('/service' ,serviceRoute)
app.use('/appoitment',appointmentRoute)
app.use('/user',userRoute)
app.listen (PORT,() => {
connectedToDatabase() 
console.log('server running')} )



