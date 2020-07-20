var express = require("express")
var session = require("express-session")
var bodyParser = require("body-parser")
var cors = require("cors")
var app = express()
var router = require("./router")

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

app.use("/", router)

app.listen(8080, () => {
    console.log("Server is running on port 8080...")
})