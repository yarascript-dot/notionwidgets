const MAX = 2000;
const STAGES = 6;

const images = {
  empty: "images/empty.png",
  stages: [
    "images/stage1.png",
    "images/stage2.png",
    "images/stage3.png",
    "images/stage4.png",
    "images/stage5.png",
    "images/stage6.png"
  ],
  over: "images/over.png"
};

const currentEl = document.getElementById("current");
const imageEl = document.getElementById("glassImage");
const buttons = document.querySelectorAll("button");

function todayKey() {
  return new Date().toISOString().split("T")[0];
}

function loadState() {
  const data = JSON.parse(localStorage.getItem("waterData")) || {};
  if (data.date !== todayKey()) {
    data.amount = 0;
    data.date = todayKey();
  }
  return data;
}

function saveState(data) {
  localStorage.setItem("waterData", JSON.stringify(data));
}

let state = loadState();
updateUI();

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = Number(btn.dataset.amount);
    const action = btn.dataset.action;

    if (action === "plus") state.amount += value;
    if (action === "minus") state.amount = Math.max(0, state.amount - value);

    saveState(state);
    updateUI();
  });
});

function updateUI() {
  currentEl.textContent = state.amount;
  imageEl.src = getImage(state.amount);
}

function getImage(amount) {
  if (amount === 0) return images.empty;
  if (amount > MAX) return images.over;

  const stage = Math.ceil((amount / MAX) * STAGES);
  return images.stages[stage - 1];
}
