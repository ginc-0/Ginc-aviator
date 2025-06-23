let multiplier = 1.00;
let crashed = false;
let crashPoint = 0;
let interval;
let betPlaced = false;
let cashedOut = false;

function startGame() {
    if (betPlaced) return;
    const betAmount = parseFloat(document.getElementById("betAmount").value);
    if (isNaN(betAmount) || betAmount <= 0) {
        alert("Enter a valid bet amount.");
        return;
    }
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
    const winnings = (betAmount * multiplier).toFixed(2);
    document.getElementById("result").innerText = `✅ You cashed out at x${multiplier} and won KES ${winnings}`;
    betPlaced = false;
}