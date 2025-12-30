async function fetchTodayProgress() {
  const today = new Date().toISOString().split("T")[0];

  const response = await fetch(
    `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${NOTION_TOKEN}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28"
      },
      body: JSON.stringify({
        filter: {
          property: "Date",
          date: {
            equals: today
          }
        }
      })
    }
  );

  const data = await response.json();
  if (!data.results.length) return null;

  const page = data.results[0];
  return page.properties[PERCENT_PROPERTY]?.formula?.number ?? 0;
}

function stageByPercent(p) {
  if (p === 0) return { icon: "⚫", label: "0%" };
  if (p <= 20) return { icon: "🔴", label: "≤ 20%" };
  if (p <= 40) return { icon: "🟠", label: "≤ 40%" };
  if (p <= 60) return { icon: "🟡", label: "≤ 60%" };
  if (p <= 80) return { icon: "🟢", label: "≤ 80%" };
  return { icon: "🔵", label: "100%" };
}

async function init() {
  try {
    const percent = await fetchTodayProgress();
    const stage = stageByPercent(percent);

    document.getElementById("stage").textContent = stage.icon;
    document.getElementById("label").textContent = `${percent}% виконано`;
  } catch (e) {
    document.getElementById("label").textContent = "Помилка даних";
  }
}

init();
