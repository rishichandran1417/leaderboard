import React, { useEffect, useState } from "react";

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRC6v9A625r9zDHwIlvifUg1qtLtPgMREyxx1yfny6i36UulsqtIBgejbhaxCZ3Y0jTcAWM4L4yItze/pub?output=csv";

export default function App() {
  const [data, setData] = useState([]);
  

  useEffect(() => {
    fetch(CSV_URL)
      .then((res) => res.text())
      .then((text) => {
        const rows = text.trim().split("\n").slice(1); 
        const formatted = rows
          .map((row) => {
            const [name, score] = row.split(",");
            return {
              name: name.trim(),
              score: Number(score),
            };
          })
          .filter((entry) => entry.name && !isNaN(entry.score));

        formatted.sort((a, b) => b.score - a.score);
        setData(formatted);
      })
      .catch((err) => console.error("CSV load error:", err));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2 className=" ">📊 Leaderboard</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {data.length === 0 && <p>Loading...</p>}
        {data.map((item, index) => (
          <li
            key={index}
            style={{
              background: "#e0f7fa",
              margin: "10px 0",
              padding: "10px",
              borderRadius: "8px",
              fontSize: "16px",
            }}
          >
            <strong>#{index + 1}</strong> - {item.name} - {item.score}
          </li>
        ))}
      </ul>
    </div>
  );
}
