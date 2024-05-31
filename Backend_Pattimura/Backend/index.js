const express = require('express')
const app = express()
const dotenv = require("dotenv")
const bodyparser = require("body-parser")
const routeUser = require("./routing/routeUser")

dotenv.config()
const {testConnection} = require("./database/db")
app.use(bodyparser.json())
app.use(routeUser)


app.listen(process.env.APP_PORT, async () => {
    await testConnection()
  console.log(`Server is running in http://localhost:${process.env.APP_PORT}`)
})