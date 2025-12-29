import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

// Встав сюди свій ключ інтеграції і ID бази
const NOTION_API_KEY = "ntn_I90760609095CGkTYYdIHbvfTDfOkX03ErTzl3wZh6dgKZ";
const DATABASE_ID = "Habit-Tracker-2c021cf9b2ed81faaac0cd24bd7deaa0";
const COLUMN_NAME = "Widgets"; // колонка типу Formula
const DATE_COLUMN = "Date";     // колонка з датою

app.get("/habit-percent", async (req, res) => {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    try {
        const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${NOTION_API_KEY}`,
                "Notion-Version": "2022-06-28",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                filter: {
                    property: DATE_COLUMN,
                    date: { equals: today }
                }
            })
        });

        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            return res.json({ percent: 0 });
        }

        const page = data.results[0];

        // Для формули звертаємося всередину formula.number
        const percent = page.properties[COLUMN_NAME].formula?.number || 0;

        res.json({ percent });

    } catch (err) {
        console.error(err);
        res.status(500).json({ percent: 0 });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
