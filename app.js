// https://www.youtube.com/watch?v=OH6Z0dJ_Huk
var express = require("express")
var session = require("express-session")
var bodyParser = require("body-parser")
var app = express()

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

var redirectLogin = (req, res, next) => {
    if (!req.session.userId) res.redirect("/login")
    else next()
}

var redirectHome = (req, res, next) => {
    if (req.session.userId) res.redirect("/home")
    else next()
}

app.get("/", (req, res) => {
    var { userId } = req.session
    res.send(`
        <h1>Welcome!</h1>
        ${userId ? `
        <a href="/home">Home</a>
        <form method="POST" action="/logout">
            <button>Logout</button>
        </form>
        ` : `
        <a href="/login">Login</a>
        <a href="/register">Register</a>
        `}
    `)
})

app.use((req, res, next) => {
    var { userId } = req.session
    if (userId)
        res.locals.user = users.find(user => user.id === userId)
    next()
})

app.get("/home", redirectLogin, (req, res) => {
    var { user } = res.locals
    res.send(`
        <h1>Home</h1>
        <a href="/">Main</a>
        <ul>
            <li>Name: ${user.name}</li>
            <li>Email: ${user.email}</li>
        </ul>

    `)
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

app.get("/register", redirectHome, (req, res) => {
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

app.post("/login", redirectHome, (req, res) => {
    var { email, password } = req.body
    if (email && password) {
        var user = users.find(user => user.email === email && user.password === password)
        if (user) {
            req.session.userId = user.id
            return res.redirect("/home")
        }
    }
    res.redirect("/login")
})

app.post("/register", redirectHome, (req, res) => {
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

app.post("/logout", redirectLogin, (req, res) => {
    req.session.destroy(err => {
        if (err) return res.redirect("/home")
        res.clearCookie("session")
        res.redirect("/home")
    })
})

app.listen(8080, () => {
    console.log("Server is running...")
})