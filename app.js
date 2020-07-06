var express = require("express")
var session = require("express-session")
var bodyParser = require("body-parser")
var app = express()

var users = [
    { id: 1, name: "Levi", email: "nyiro.levente@gmail.com", password: "Valami12" },
    { id: 2, name: "Zsombor", email: "zsombor@gmail.com", password: "Valami12" }
]

app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
    name: "session",
    resave: false,
    saveUninitialized: false,
    secret: "ssh!quiet,it\'asecret!",
    cookie: {
        maxAge: 1000 * 60 * 60 * 2,
        sameSite: true,
        secure: false
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
    //console.log(req.session)
    //var userId = 1
    console.log(userId)
    res.send(`
        <h1>Welcome!</h1>
        ${userId ? `
        <a href="/login">Login</a>
        <a href="/register">Register</a>` : `
        <a href="/home">Home</a>
        <form method="POST action="/logout">
            <button>Logout</button>
        </form>
        `}



    `)
})

app.use((req, res, next) => {
    if (req.session)
        res.locals.user = users.find(user => user.id === userId)
    next()
})

app.get("/home", redirectLogin, (req, res) => {
    var { user } = res.locals
    console.log(req.session.id)
    res.send(`
        <h1>Home</h1>
        <a href="/">Main</a>
        <ul>
            <li>Name: ${user.name}</li>
            <li>Email: ${user.email}</li>
        </ul>
    `)
})

app.get("/profile", redirectLogin, (req, res) => {
    var { user } = res.locals
})

app.get("/login", redirectHome, (req, res) => {
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
            <input type="name" placeholder="Name" required>
            <input type="email" name="email" placeholder="Email" required>
            <input name="password" name="password" placeholder="Password" required>
            <input type="submit">
        </form>
        <a href="/login">Login</a>
    `)
})

app.post("/login", redirectHome, (req, res) => {
    var { email, password } = req.body
    if (email && password) {
        if (users.find(user => user.email === email && user.password === password)) {
            req.session.userId = user.id
            return res.redirect("/home")
        }
    }
    res.redirect("/login")
})

app.post("/register", redirectHome, (req, res) => {
    var { name, email, password } = req.body

    if (name && email && password) {
        if (users.some(user => user.email === email)) {
            var user = {
                id: users.length + 1,
                name,
                email,
                password
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
        res.redirect("/login")
    })
})

app.listen(8080, () => {
    console.log("Server is running...")
})