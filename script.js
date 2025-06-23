let multiplier = 1.00;
let crashed = false;
let crashPoint = 0;
let interval;
let betPlaced = false;
let cashedOut = false;
let currentUser = null;

function loadUser() {
  currentUser = localStorage.getItem("currentUser");
  const users = JSON.parse(localStorage.getItem("users")) || {};
  if (!currentUser || !users[currentUser]) {
    window.location.href = "login.html";
    return;
  }
  document.getElementById("welcome").innerText = "👋 Welcome, " + currentUser;
  document.getElementById("balance").innerText = users[currentUser].balance.toFixed(2);
}

function updateBalance(amount) {
  let users = JSON.parse(localStorage.getItem("users"));
  users[currentUser].balance += amount;
  localStorage.setItem("users", JSON.stringify(users));
  document.getElementById("balance").innerText = users[currentUser].balance.toFixed(2);
}

function startGame() {
  if (betPlaced) return;
  const betAmount = parseFloat(document.getElementById("betAmount").value);
  if (isNaN(betAmount) || betAmount <= 0) {
    alert("Enter a valid bet amount.");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users"));
  if (users[currentUser].balance < betAmount) {
    alert("Insufficient balance.");
    return;
  }

  updateBalance(-betAmount);
  document.getElementById("result").innerText = "";
  multiplier = 1.00;
  crashed = false;
  cashedOut = false;
  crashPoint = (Math.random() * 5 + 1).toFixed(2);
  betPlaced = true;

  interval = setInterval(() => {
    if (crashed || cashedOut) return;
    multiplier += 0.01;
    multiplier = parseFloat(multiplier.toFixed(2));
    document.getElementById("multiplier").innerText = `x${multiplier}`;

    if (multiplier >= crashPoint) {
      crashed = true;
      clearInterval(interval);
      document.getElementById("result").innerText = `💥 Crashed at x${crashPoint}! You lost.`;
      betPlaced = false;
    }
  }, 100);
}

function cashOut() {
  if (!betPlaced || cashedOut || crashed) return;
  cashedOut = true;
  clearInterval(interval);
  const betAmount = parseFloat(document.getElementById("betAmount").value);
  const winnings = parseFloat((betAmount * multiplier).toFixed(2));
  updateBalance(winnings);
  document.getElementById("result").innerText = `✅ Cashed out at x${multiplier}, won KES ${winnings}`;
  betPlaced = false;
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}