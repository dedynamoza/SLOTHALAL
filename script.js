const symbols = ["🍒", "🍋", "🔔", "💎", "7️⃣", "🍇", "🥝", "⭐"];
const payouts = {
  "🍒🍒🍒": 10,
  "🍋🍋🍋": 15,
  "🔔🔔🔔": 25,
  "💎💎💎": 50,
  "7️⃣7️⃣7️⃣": 100,
  "⭐⭐⭐": 75
};

let balance = 200;
let spinCount = 0;

function spin() {
  const spinSound = document.getElementById("spinSound");
  const jackpotSound = document.getElementById("jackpotSound");
  const jackpotBanner = document.getElementById("jackpotBanner");
  const balanceDisplay = document.getElementById("balance");
  const resultDisplay = document.getElementById("result");

  jackpotBanner.style.display = "none";
  spinSound.currentTime = 0;
  spinSound.play();

  if (balance < 10) {
    resultDisplay.textContent = "Saldo tidak cukup!";
    return;
  }

  balance -= 10;
  balanceDisplay.textContent = balance;
  resultDisplay.textContent = "Memutar...";
  spinCount++;

  const pattern = [10, 24, 38];
  const isJackpotSpin = pattern.includes(spinCount % 48);

  const reelEls = [
    document.getElementById("reel1"),
    document.getElementById("reel2"),
    document.getElementById("reel3")
  ];

  let finalSymbols = [];

  if (isJackpotSpin) {
    const lucky = symbols[Math.floor(Math.random() * symbols.length)];
    finalSymbols = [lucky, lucky, lucky];
  }

  let counter = 0;
  const rolling = setInterval(() => {
    reelEls.forEach((el) => {
      el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    });
    counter++;
    if (counter >= 12) {
      clearInterval(rolling);

      if (!isJackpotSpin) {
        for (let i = 0; i < 3; i++) {
          const symbol = symbols[Math.floor(Math.random() * symbols.length)];
          reelEls[i].textContent = symbol;
          finalSymbols.push(symbol);
        }
      } else {
        for (let i = 0; i < 3; i++) {
          reelEls[i].textContent = finalSymbols[i];
        }
      }

      const combo = finalSymbols.join("");
      const win = payouts[combo] || 0;

      if (win > 0) {
        const reward = win * 10;
        balance += reward;
        balanceDisplay.textContent = balance;
        resultDisplay.textContent = `JACKPOT! Menang besar! +${reward} koin 🎊🎉`;
        jackpotSound.currentTime = 0;
        jackpotSound.play();
        jackpotBanner.textContent = `🎉 JACKPOT! +${reward} KOIN 🎉`;
        jackpotBanner.style.display = "block";
      } else {
        resultDisplay.textContent = `Tidak menang. Coba lagi! 😢`;
      }
    }
  }, 50);
}
