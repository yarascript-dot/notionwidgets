const STEP = 200;
const MAX = 2000;

const fill = document.getElementById("water-fill");
const currentText = document.getElementById("current");

function todayKey() {
  const d = new Date();
  return d.toISOString().split("T")[0];
}

function load() {
  const savedDate = localStorage.getItem("water-date");
  const today = todayKey();

  if (savedDate !== today) {
    localStorage.setItem("water-date", today);
    localStorage.setItem("water-amount", 0);
  }

  return Number(localStorage.getItem("water-amount")) || 0;
}

let amount = load();

function render() {
  amount = Math.max(0, amount);

  const visualAmount = Math.min(amount, MAX);
  const percent = visualAmount / MAX;

  fill.style.height = percent * 100 + "%";
  currentText.textContent = amount;

  localStorage.setItem("water-amount", amount);
}


document.getElementById("plus").onclick = () => {
  amount += STEP;
  render();
};

document.getElementById("minus").onclick = () => {
  amount -= STEP;
  render();
};

render();
