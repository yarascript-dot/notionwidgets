const slider = document.getElementById("slider");
const progressFill = document.getElementById("progressFill");
const current = document.getElementById("current");
const bar = document.querySelector(".progress-bar");

const max = 26;
let isDragging = false;

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

function update(value) {
  const percent = (value / max) * 100;
  progressFill.style.width = `${percent}%`;
  slider.style.left = `${percent}%`;
  current.textContent = value;
}
