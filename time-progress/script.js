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

function set(barId, textId, value) {
  document.getElementById(barId).style.width = value * 100 + "%";
  document.getElementById(textId).textContent =
    Math.round((1 - value) * 100) + "%";
}

function update() {
  const now = new Date();
  document.getElementById("clock").textContent = formatTime(now);

  // Year
  set(
    "year-bar",
    "year-left",
    progress(
      new Date(now.getFullYear(), 0, 1),
      new Date(now.getFullYear() + 1, 0, 1)
    )
  );

  // Month
  set(
    "month-bar",
    "month-left",
    progress(
      new Date(now.getFullYear(), now.getMonth(), 1),
      new Date(now.getFullYear(), now.getMonth() + 1, 1)
    )
  );

  // Week (Monday)
  const day = (now.getDay() + 6) % 7;
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - day);
  weekStart.setHours(0,0,0,0);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 7);

  set("week-bar", "week-left", progress(weekStart, weekEnd));

  // Day
  const dayStart = new Date(now);
  dayStart.setHours(0,0,0,0);
  const dayEnd = new Date(dayStart);
  dayEnd.setDate(dayStart.getDate() + 1);

  set("day-bar", "day-left", progress(dayStart, dayEnd));
}

update();
setInterval(update, 1000);
