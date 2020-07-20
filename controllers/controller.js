/*var Database = require("../models/Database")
var Bcrypt = require("../models/Bcrypt")*/

var users = [
    { id: 1, name: "Levi", email: "nyiro.levente@gmail.com", password: "Valami12" },
    { id: 2, name: "Marci", email: "nyiro.marci@gmail.com", password: "Valami12" }
]

exports.login = (req, res) => {
    var user = users.find(user => user.email === req.body.email && user.password === req.body.password)
    if (user) {
        req.session.userId = user.id
        res.end()
    } else {
        res.statusCode = 401
        res.end()
    }
}

exports.getData = (req, res) => {
    var user = users.find(user => user.id === req.session.userId)
    //user == undefined ? console.log("Sikertelen") : console.log("Sikeres")
    res.json(user)
}

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err
        res.clearCookie("session")
        res.send("Successful logout!")
    })
}