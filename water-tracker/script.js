const DAILY_GOAL = 2000;

// дата
const today = new Date().toDateString();
const savedDate = localStorage.getItem("water-date");

// стан
let amount = 0;

if (savedDate === today) {
  amount = Number(localStorage.getItem("water-amount")) || 0;
} else {
  localStorage.setItem("water-date", today);
  localStorage.setItem("water-amount", 0);
  amount = 0;
}

// DOM
const currentEl = document.getElementById("current");
const fillEl = document.getElementById("fill");

function render() {
  if (amount < 0) amount = 0;

  localStorage.setItem("water-amount", amount);
  currentEl.textContent = amount;

  const percent = Math.min(amount / DAILY_GOAL, 1);
  fillEl.style.height = `${percent * 100}%`;
}

// ВАЖЛИВО: переконуємось, що кнопки існують
document.querySelectorAll("button[data-step]").forEach(btn => {
  btn.addEventListener("click", () => {
    amount += Number(btn.dataset.step);
    render();
  });
});

render();
