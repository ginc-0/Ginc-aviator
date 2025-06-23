function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[username] && users[username].password === password) {
    localStorage.setItem("currentUser", username);
    window.location.href = "index.html";
  } else {
    document.getElementById("authMsg").innerText = "❌ Invalid credentials";
  }
}

function register() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[username]) {
    document.getElementById("authMsg").innerText = "⚠️ User already exists";
  } else {
    users[username] = {
      password: password,
      balance: 1000,
      history: []
    };
    localStorage.setItem("users", JSON.stringify(users));
    document.getElementById("authMsg").innerText = "✅ Registered successfully. You can now log in.";
  }
}