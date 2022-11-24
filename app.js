require("dotenv").config()

require("./db")

const express = require("express")
const { roles } = require("./middleware/route-guard")
const app = express()

require("./config")(app)
require('./config/session.config')(app)

app.locals.appTitle = 'Social Madrid'

app.use(roles)
require("./routes")(app)
require("./error-handling")(app)

module.exports = app