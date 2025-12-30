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
  const sliderWidth = slider.offsetWidth;
  const radius = sliderWidth / 2;

  let x = e.clientX - rect.left;

  x = Math.max(radius, Math.min(x, rect.width - radius));

  const percent = (x - radius) / (rect.width - sliderWidth);
  const value = Math.round(percent * max);

  update(value);
});

/* ---------- логіка ---------- */

function update(value) {
  const clamped = Math.max(0, Math.min(value, max));
  const percent = clamped / max;

  const sliderWidth = slider.offsetWidth;
  const barWidth = bar.offsetWidth;
  const x = percent * (barWidth - sliderWidth) + sliderWidth / 2;

  progressFill.style.width = `${percent * 100}%`;
  slider.style.left = `${x}px`;
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
