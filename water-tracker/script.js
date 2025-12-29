const DAILY_GOAL = 2000;

// визначаємо сьогоднішній день
const today = new Date().toDateString();
const savedDate = localStorage.getItem("water-date");

// кількість випитої води
let amount = 0;

// перевірка дати
if (savedDate === today) {
  amount = Number(localStorage.getItem("water-amount")) || 0;
} else {
  localStorage.setItem("water-date", today);
  localStorage.setItem("water-amount", 0);
  amount = 0;
}

// DOM елементи
const currentEl = document.getElementById("current");
const fillEl = document.getElementById("fill");

// основна функція відображення
function render() {
  if (amount < 0) amount = 0;

  // зберігаємо значення
  localStorage.setItem("water-amount", amount);

  // оновлюємо текст
  currentEl.textContent = amount;

  // оновлюємо рівень заповнення
  const percent = Math.min(amount / DAILY_GOAL, 1);
  fillEl.style.height = `${percent * 100}%`;
}

// кнопки + / -
document.querySelectorAll("[data-step]").forEach(button => {
  button.addEventListener(
