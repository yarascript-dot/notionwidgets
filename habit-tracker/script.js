const NOTION_API_KEY = "ntn_I90760609095CGkTYYdIHbvfTDfOkX03ErTzl3wZh6dgKZ";
const DATABASE_ID = "Habit-Tracker-2c021cf9b2ed81faaac0cd24bd7deaa0";
const COLUMN_NAME = "Widgets"; // Назва колонки з відсотком виконання

async function fetchNotionData() {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${NOTION_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            filter: {
                property: "Date", // колонка з датою
                date: {
                    equals: today
                }
            }
        })
    });

    const data = await response.json();
    if (data.results.length === 0) return 0;

    const page = data.results[0];
const percent = page.properties[COLUMN_NAME].formula.number || 0;

    return percent;
}

function updateProgress(percent) {
    const span = document.getElementById("percent");
    span.textContent = `${percent}%`;

    let angle;
    if (percent >= 100) angle = 360;
    else if (percent >= 80) angle = 288;
    else if (percent >= 60) angle = 216;
    else if (percent >= 40) angle = 144;
    else if (percent >= 20) angle = 72;
    else angle = 0;

    document.querySelector(".progress-circle").style.background = `conic-gradient(#4caf50 0deg, #4caf50 ${angle}deg, #ddd ${angle}deg, #ddd 360deg)`;
}

async function refreshWidget() {
    const percent = await fetchNotionData();
    updateProgress(percent);
}

// Початкове завантаження
refreshWidget();

// Оновлення щохвилини
setInterval(refreshWidget, 60000);
