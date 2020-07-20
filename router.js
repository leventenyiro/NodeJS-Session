var express = require("express")
var router = express.Router()
var controller = require("./controllers/controller")

router.post("/login", controller.login)

router.get("/login", controller.getData)

router.post("/logout", controller.logout)

module.exports = router