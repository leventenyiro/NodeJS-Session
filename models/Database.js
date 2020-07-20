class Database {
    constructor() {
        var mysql = require("mysql")
        this.conn = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "user"
        })
        this.hashedId = ""
    }

    /*registration(req, password, callback) {
        this.generateNewHash()
        var sql = `INSERT INTO user (id, username, email, password, birthdate, lastlogin) VALUES (
            "${this.hashedId}",
            "${req.body.username}",
            "${req.body.email}",
            "${password}",
            "${req.body.birthdate}",
            CURRENT_TIMESTAMP)`
        this.conn.query(sql, (err) => {
            if (err) return callback("exists")
            return callback("success")
        })
    }

    generateNewHash() {
        this.hashedId = require("crypto").randomBytes(10).toString("hex")
        this.conn.query(`SELECT COUNT(*) AS count FROM user WHERE id = "${this.hashedId}"`, (err, result) => {
            if (result[0].count === 1) this.generateNewHash()
        })
    }*/

    login(req, callback) {
        var sql = `SELECT id, password FROM user WHERE username = "${req.body.usernameEmail}" OR email = "${req.body.usernameEmail}"`
        this.conn.query(sql, (err, result) => {
            if (err) return callback("error")
            return callback(result)
        })
    }

    end() {
        this.conn.end()
    }
}

module.exports = Database