/*function login() {
    document.cookie = "Valami=1"
    var xhr = new XMLHttpRequest()
    xhr.open("POST", "http://localhost:8080/login", false)
    xhr.setRequestHeader("Content-type", "application/json")
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("name").innerHTML = "loading"
        }
    }
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    var data = { email: email, password: password }
    xhr.send(JSON.stringify(data))
    document.getElementById("name").innerHTML = 
    //window.location.href = "./home.html"

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("name").innerHTML = "loading"
        }
    }
    xhr.open("GET", "http://localhost:8080/login", false)
    xhr.send()
    console.log(JSON.stringify(xhr.response))
    document.getElementById("name").innerHTML = xhr.response
}*/

function home() {
    var xhr = new XMLHttpRequest()
    xhr.open("GET", "http://localhost:8080/login", true)
    xhr.send()
    var user = JSON.parse(xhr.response)
    console.log(user)
    document.getElementById("email").innerHTML = user.email
    document.getElementById("name").innerHTML = user.name
}

function login() {
    var xhr = new XMLHttpRequest()
    xhr.open("POST", "http://localhost:8080/login", true)
    xhr.setRequestHeader("Content-type", "application/json")
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("name").innerHTML = xhr.response
        }
    }
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    var data = { email: email, password: password }
    xhr.send(JSON.stringify(data))
    console.log(xhr.response)
    document.cookie = "username=John Smith; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
    console.log(document.cookie)

    /*xhr.open("GET", "http://localhost:8080/login", true)
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("name").innerHTML = xhr.response
        }
    }
    xhr.send()
    var response = JSON.stringify(xhr.response)
    console.log(response)
    document.getElementById("name").innerHTML = response.name*/
}