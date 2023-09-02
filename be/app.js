const express = require("express")
const app = express()
const api = require('./router/router')
const cors = require('cors')

require('dotenv').config()

app.use(cors())
app.use('/api',api)
app.use('/public', express.static('public'))

app.listen(process.env.NODE_PORT,() =>{
    console.log(`http://localhost:${process.env.NODE_PORT}`)
})