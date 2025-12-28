function progress(start, end) {
  const now = new Date();
  return Math.min(
    Math.max((now - start) / (end - start), 0),
    1
  );
}

function update() {
  const now = new Date();

  // Рік
  const yearStart = new Date(now.getFullYear(), 0, 1);
  const yearEnd = new Date(now.getFullYear() + 1, 0, 1);
  document.getElementById("year").style.width =
    progress(yearStart, yearEnd) * 100 + "%";

  // Місяць
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  document.getElementById("month").style.width =
    progress(monthStart, monthEnd) * 100 + "%";

  // Тиждень (з понеділка)
  const day = (now.getDay() + 6) % 7;
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - day);
  weekStart.setHours(0,0,0,0);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 7);
  document.getElementById("week").style.width =
    progress(weekStart, weekEnd) * 100 + "%";

  // День
  const dayStart = new Date(now);
  dayStart.setHours(0,0,0,0);
  const dayEnd = new Date(dayStart);
  dayEnd.setDate(dayStart.getDate() + 1);
  document.getElementById("day").style.width =
    progress(dayStart, dayEnd) * 100 + "%";
}

update();
setInterval(update, 60000);
