async function home() {
    var user = await fetch(`http://localhost:8080/login`, {
        method: "GET",
        credentials: "include"
    }).then(user => user.json())
    document.getElementById("email").innerHTML = user.email
    document.getElementById("name").innerHTML = user.name
}

async function login() {
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    var response = await fetch(`http://localhost:8080/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password })
    }).then(response => response.status)
    if (response == 200) {
        alert("Ok")
        window.location = "./home.html"
    } else {
        alert("Rossz")
    }
}