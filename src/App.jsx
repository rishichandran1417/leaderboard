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
      <h2 style={{ marginBottom: "20px", fontWeight: "bold" }}>📊 Leaderboard</h2>

      {/* Header Row */}
      <div
        style={{
          backgroundColor: "#00796b",
          color: "white",
          padding: "15px",
          borderRadius: "8px",
          display: "grid",
          gridTemplateColumns: "0.5fr 2fr 2fr 2fr 1fr",
          marginBottom: "10px",
          fontWeight: "bold",
        }}
      >
        <p></p>
        <p>Name</p>
        <p>College</p>
        <p>Branch</p>
        
        <p>Score</p>
      </div>

      {/* Data Rows */}
      {data.length === 0 ? (
        <p>Loading...</p>
      ) : (
        data.map((item, index) => (
          <div
            key={index}
            style={{

              padding: "15px",
              marginBottom: "10px",
              borderRadius: "8px",
              border: "#0732EF 2px solid",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              display: "grid",
              gridTemplateColumns: "0.5fr 2fr 2fr 2fr 1fr",
               gap: "10px",
            alignItems: "center",
            fontWeight: "bold",
            }}
          >
            <p><strong>{index + 1}</strong></p>
            <p>{item.name}</p>
            <p>{item.branch}</p>
            <p>{item.college}</p>
            <p>{item.score}</p>
          </div>
        ))
      )}
    </div>
  );
}
