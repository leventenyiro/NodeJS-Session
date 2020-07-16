// https://www.youtube.com/watch?v=OH6Z0dJ_Huk
var express = require("express")
var session = require("express-session")
var bodyParser = require("body-parser")
var app = express()
var cors = require("cors")
const { json } = require("express")

var users = [
    { id: 1, name: "Levi", email: "nyiro.levente@gmail.com", password: "Valami12" },
    { id: 2, name: "Valami", email: "valami@gmail.com", password: "Valami12" }
]

var {
    PORT = 8080,
    NODE_ENV = "development",
    SESS_SECRET = "ssh!quiet\'asecret!"
} = process.env

var IN_PROD = NODE_ENV === "production"

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.use(session({
    name: "session",
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2,
        sameSite: true,
        secure: IN_PROD
    }
}))

app.get("/home", (req, res) => {
    //var { user } = users.find(user => user.id === req.session.userId)
    users.forEach(user => {
        if (user.id === req.session.userId)
            res.send(user)
    });

})

app.get("/login", (req, res) => {
    res.send(`
        <h1>Login</h1>
        <form method="POST" action="/login">
            <input type="email" name="email" placeholder="Email" required>
            <input name="password" name="password" placeholder="Password" required>
            <input type="submit">
        </form>
        <a href="/register">Register</a>
    `)
})

app.get("/register", (req, res) => {
    res.send(`
        <h1>Register</h1>
        <form method="POST" action="/register">
            <input type="name" name="name" placeholder="Name" required>
            <input type="email" name="email" placeholder="Email" required>
            <input type="password" name="password" placeholder="Password" required>
            <input type="submit">
        </form>
        <a href="/login">Login</a>
    `)
})

app.post("/login", (req, res) => {
    var { email, password } = req.body
    if (email && password) {
        var user = users.find(user => user.email === email && user.password === password)
        if (user) {
            req.session.userId = user.id
            res.send(req.session)
            //return res.redirect("/home")
        }
    }
    //res.redirect("/login")
})

app.post("/register", (req, res) => {
    var { name, email, password } = req.body

    if (name && email && password) {
        var exists = users.some(user => user.email === email)
        if (!exists) {
            var user = {
                id: users.length + 1,
                name: name,
                email: email,
                password: password
            }
            users.push(user)
            req.session.userId = user.id
            return res.redirect("/home")
        }
    }
    res.redirect("/register")
})

app.post("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) return res.redirect("/home")
        res.clearCookie("session")
        res.redirect("/home")
    })
})

app.listen(8080, () => {
    console.log("Server is running...")
})