const { isLoggedIn } = require("../middleware/route-guard")

module.exports = app => {
    app.use("/", require("./index.routes"))
    app.use("/auth", require('./auth.routes'))
    app.use("/places", isLoggedIn, require("./places.routes"))
    app.use("/user", require("./user.routes"))
    app.use("/api", require("./api.routes"))
    app.use("/", require("./map.routes"))
}