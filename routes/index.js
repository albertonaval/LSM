
module.exports = app => {
    app.use("/", require("./index.routes"))
    app.use("/auth", require('./auth.routes'))
    app.use("/places", require("./places.routes"))
    app.use("/user", require("./user.routes"))
}

