const slider = document.getElementById("slider");
const progressFill = document.getElementById("progressFill");
const current = document.getElementById("current");
const bar = document.querySelector(".progress-bar");

const max = 26;
const STORAGE_KEY = "year_goals_progress";

let isDragging = false;

/* ---------- події ---------- */

slider.addEventListener("mousedown", () => {
  isDragging = true;
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const rect = bar.getBoundingClientRect();
  let x = e.clientX - rect.left;

  x = Math.max(0, Math.min(x, rect.width));

  const percent = x / rect.width;
  const value = Math.round(percent * max);

  update(value);
});

/* ---------- логіка ---------- */

function update(value) {
  const clamped = Math.max(0, Math.min(value, max));
  const percent = (clamped / max) * 100;

  progressFill.style.width = `${percent}%`;
  slider.style.left = `${percent}%`;
  current.textContent = clamped;

  save(clamped);
}

/* ---------- localStorage ---------- */

function save(value) {
  localStorage.setItem(STORAGE_KEY, value);
}

function load() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved !== null) {
    update(Number(saved));
  } else {
    update(0);
  }
}

/* ---------- ресайз ---------- */

window.addEventListener("resize", () => {
  const value = Number(current.textContent);
  update(value);
});

/* ---------- старт ---------- */

load();
