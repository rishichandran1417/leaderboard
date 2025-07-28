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
            const [name, score, college, branch] = row.split(",");
            if (!name || isNaN(Number(score))) return null;
            return {
              name: name.trim(),
              score: Number(score),
              college: college?.trim() || "N/A",
              branch: branch?.trim() || "N/A",
            };
          })
          .filter(Boolean);

        formatted.sort((a, b) => b.score - a.score);
        setData(formatted);
      })
      .catch((err) => console.error("CSV load error:", err));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2 style={{ marginBottom: "20px" }}>📊 Leaderboard</h2>
      {data.length === 0 ? (
        <p>Loading...</p>
      ) : (
        data.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#e0f7fa",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              display: "grid",
              gridTemplateColumns: "60px 150px 150px 150px 80px",
            }}
          >
            <p style={{ marginRight: "20px", fontWeight: "bold" }}>
              <strong>#{index + 1}</strong>
            </p>
            <p style={{ marginRight: "20px" ,fontWeight: "bold",fontSize: "16px"}}><strong></strong> {item.name}</p>
            <p style={{ marginRight: "20px" ,fontWeight: "bold",fontSize: "16px"}}><strong></strong> {item.college}</p>
            <p style={{ marginRight: "20px" ,fontWeight: "bold",fontSize: "16px"}}><strong></strong> {item.branch}</p>
            <p style={{ marginRight: "20px" ,fontWeight: "bold",fontSize: "16px"}}><strong></strong> {item.score}</p>
          </div>
        ))
      )}
    </div>
  );
}
