const express = require('express')
const { ambilDataUser } = require('../controller/user')
const route = express.Router()

route.get("/user", ambilDataUser)

module.exports = route