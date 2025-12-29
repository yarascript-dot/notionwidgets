const DAILY_GOAL = 2000;
let amount = 0;

const currentEl = document.getElementById("current");
const fillEl = document.getElementById("fill");

function render() {
  if (amount < 0) amount = 0;

  currentEl.textContent = amount;

  const percent = Math.min(amount / DAILY_GOAL, 1);
  fillEl.style.height = `${percent * 100}%`;
}

document.querySelectorAll("[data-step]").forEach(button => {
  button.addEventListener("click", () => {
    const step = Number(button.dataset.step);
    amount += step;
    render();
  });
});

render();
