var express = require("express")
var session = require("express-session")
var bodyParser = require("body-parser")
var cors = require("cors")
var app = express()

var users = [
    { id: 1, name: "Levi", email: "nyiro.levente@gmail.com", password: "Valami12" },
    { id: 2, name: "Marci", email: "nyiro.marci@gmail.com", password: "Valami12" }
]

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors({credentials: true, origin: "http://localhost"}))
app.use(session({
    name: "session",
    secret: "secret",
    saveUninitialized: true,
    resave: true,
    unset: 'destroy',
    cookie: {
        maxAge: null
    }
}))

app.post("/login", (req, res) => {
    var user = users.find(user => user.email === req.body.email && user.password === req.body.password)
    if (user) {
        req.session.userId = user.id
        res.end()
    } else {
        res.statusCode = 401
        res.end()
    }
})

app.get("/login", (req, res) => {
    var user = users.find(user => user.id === req.session.userId)
    //user == undefined ? console.log("Sikertelen") : console.log("Sikeres")
    res.json(user)
})

app.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err
        res.clearCookie("session")
        res.send("Successful logout!")
    })
})

app.listen(8080, () => {
    console.log("Server is running on port 8080...")
})