const NOTION_API_KEY = "ntn_F9076060909cp5pw3iT2IDoQR3CQl6CMEMmFklrBfSRe5y";
const DATABASE_ID = "Habit-Tracker-2c021cf9b2ed81faaac0cd24bd7deaa0";
// Отримати прогрес на сьогодні
async function getTodayProgress() {
    const today = new Date().toISOString().split("T")[0];

    const res = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${NOTION_API_KEY}`,
            "Notion-Version": "2022-06-28",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            filter: {
                property: "Day",
                date: { equals: today }
            }
        })
    });

    const data = await res.json();

    if (!data.results || data.results.length === 0) return 0;

    // Колонка з відсотком у Notion називається "Widgets"
    const progress = data.results[0].properties["Widgets"].number || 0;
    return progress;
}

// Вибір стилю за 6 стадіями
function getWidgetStyle(progress) {
    if (progress === 100) return { bg: "#0f9d58", text: "💯" };
    if (progress >= 80) return { bg: "#34a853", text: "🟢" };
    if (progress >= 60) return { bg: "#fbbc05", text: "🟡" };
    if (progress >= 40) return { bg: "#f9ab00", text: "🟠" };
    if (progress >= 20) return { bg: "#ea4335", text: "🔴" };
    return { bg: "#808080", text: "⬛" };
}

// Оновлення віджета
async function updateWidget() {
    const progress = await getTodayProgress();
    const widget = document.getElementById("habit-widget").querySelector(".progress-circle");
    const style = getWidgetStyle(progress);
    widget.style.backgroundColor = style.bg;
    document.getElementById("progress-text").textContent = style.text + " " + progress + "%";
}

// Оновлюємо одразу і щохвилини
updateWidget();
setInterval(updateWidget, 60 * 1000);
