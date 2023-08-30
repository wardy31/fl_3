const express = require("express")
const app = express()

require('dotenv').config()


app.listen(process.env.NODE_PORT,() =>{
    console.log(`http://localhost:${process.env.NODE_PORT}`)
})