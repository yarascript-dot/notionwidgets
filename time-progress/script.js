function formatTime(date) {
  return date.toLocaleTimeString("uk-UA", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}

function progress(start, end) {
  const now = new Date();
  return Math.min(Math.max((now - start) / (end - start), 0), 1);
}

function set(idBar, idText, value) {
  document.getElementById(idBar).style.width = value * 100 + "%";
  document.getElementById(idText).textContent =
    Math.round((1 - value) * 100) + "%";
}

function update() {
  const now = new Date();
  document.getElementById("clock").textContent = formatTime(now);

  // Year
  const yStart = new Date(now.getFullYear(), 0, 1);
  const yEnd = new Date(now.getFullYear() + 1, 0, 1);
  set("year-bar", "year-left", progress(yStart, yEnd));

  // Month
  const mStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const mEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  set("month-bar", "month-left", progress(mStart, mEnd));

  // Week (Monday start)
  const day = (now.getDay() + 6) % 7;
  const wStart = new Date(now);
  wStart.setDate(now.getDate() - day);
  wStart.setHours(0,0,0,0);
  const wEnd = new Date(wStart);
  wEnd.setDate(wStart.getDate() + 7);
  set("week-bar", "week-left", progress(wStart, wEnd));

  // Day
  const dStart = new Date(now);
  dStart.setHours(0,0,0,0);
  const dEnd = new Date(dStart);
  dEnd.setDate(dStart.getDate() + 1);
  set("day-bar", "day-left", progress(dStart, dEnd));
}

update();
setInterval(update, 1000);
