import React, { useEffect, useState } from "react";
import "./Leaderboard.css";

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRC6v9A625r9zDHwIlvifUg1qtLtPgMREyxx1yfny6i36UulsqtIBgejbhaxCZ3Y0jTcAWM4L4yItze/pub?output=csv";

export default function Leaderboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(CSV_URL)
      .then((res) => res.text())
      .then((text) => {
        const rows = text.trim().split("\n").slice(1);
        const formatted = rows
          .map((row) => {
            const [name, score, college, branch] = row.split(",");
            return {
              name: name?.trim(),
              score: Number(score),
              college: college?.trim(),
              branch: branch?.trim(),
            };
          })
          .filter(Boolean)
          .sort((a, b) => b.score - a.score);

        setData(formatted);
      });
  }, []);

  const top3 = data.slice(0, 3);
  const others = data.slice(3);

  return (
    <div className="leaderboard-container">
      <h2>🏆 LEADERBOARD</h2>

      <div className="top-three">
        {top3.map((player, idx) => (
          <div key={idx} className={`medal-card medal-${idx + 1}`}>
            <div className="avatar">👤</div>
            <p className="name">{player.name}</p>
            <p className="score">{player.score}</p>
            <p className="sub">{player.college}</p>
            <p className="sub">{player.branch}</p>
            <span className="medal">{idx + 1}</span>
          </div>
        ))}
      </div>

      <div className="others">
        {others.map((player, idx) => (
          <div key={idx} className="entry">
            <div className="entry-left">
              <span className="rank">{idx + 4}</span>
             
              <div className="info">
                 <span className="icon">👤</span>
               <div> <p className="name">{player.name}</p> </div>
              <div className="college">  <p className="sub">{player.college}  </p> </div>
                <div className="branch"> <p className="sub">{player.branch}</p> </div>
              </div>
            </div>
            <span className="score-pill">{player.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
