import React, { useEffect, useState } from "react";

// Main App component
const App = () => {
  const CSV_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRC6v9A625r9zDHwIlvifUg1qtLtPgMREyxx1yfny6i36UulsqtIBgejbhaxCZ3Y0jTcAWM4L4yItze/pub?output=csv";

  // State for the individual leaderboard data
  const [individualData, setIndividualData] = useState([]);
  // State for the group leaderboard data
  const [groupData, setGroupData] = useState([]);
  // State to toggle between individual and group views
  const [showIndividual, setShowIndividual] = useState(true);
  // State for loading indicator
  const [isLoading, setIsLoading] = useState(true);

  // useEffect hook to fetch and process data when the component mounts
  useEffect(() => {
    fetch(CSV_URL)
      .then((res) => res.text())
      .then((text) => {
        const rows = text.trim().split("\n").slice(1);

        // --- Individual Leaderboard Logic ---
        const formattedIndividual = rows
          .map((row) => {
            const [name, group, branch, college, scoreStr] = row.split(",");
            const score = Number(scoreStr);
            return {
              name: name?.trim(),
              group: group?.trim(),
              branch: branch?.trim(),
              college: college?.trim(),
              score: score,
            };
          })
          .filter((item) => item.name); // Filter out any invalid rows
        
        formattedIndividual.sort((a, b) => b.score - a.score);
        setIndividualData(formattedIndividual);

        // --- Group Leaderboard Logic ---
        const aggregatedGroups = {};
        rows.forEach((row) => {
          const [, group, , , scoreStr] = row.split(",");
          const groupName = group?.trim();
          const score = Number(scoreStr);

          if (groupName && !isNaN(score)) {
            if (aggregatedGroups[groupName]) {
              aggregatedGroups[groupName].score += score;
            } else {
              aggregatedGroups[groupName] = {
                group: groupName,
                score: score,
              };
            }
          }
        });
        const formattedGroup = Object.values(aggregatedGroups);
        formattedGroup.sort((a, b) => b.score - a.score);
        setGroupData(formattedGroup);

        setIsLoading(false); // Set loading to false after data is processed
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  // Handler for the toggle button
  const handleToggle = () => {
    setShowIndividual(!showIndividual);
  };

  // Helper function to render a leaderboard
  const renderLeaderboard = (data, isIndividual) => {
    const top3 = data.slice(0, 3);
    const others = data.slice(3);
    const title = isIndividual ? "🏆 INDIVIDUAL LEADERBOARD" : "🏆 GROUP LEADERBOARD";
    const avatarIcon = isIndividual ? "👤" : "👥";

    return (
      <div className="leaderboard-section">
        <h2>{title}</h2>
        <div className="top-three">
          {/* 2nd place */}
          {top3[1] && (
            <div className="medal-card medal-2">
              <div className="avatar">{avatarIcon}</div>
              <p className="name">{isIndividual ? top3[1].name : top3[1].group}</p>
              <p className="score">{top3[1].score}</p>
              {isIndividual && <p className="sub">{top3[1].group}</p>}
              {isIndividual && <p className="sub">{top3[1].college}</p>}
              {isIndividual && <p className="sub">{top3[1].branch}</p>}
              <span className="medal">2</span>
            </div>
          )}
          {/* 1st place */}
          {top3[0] && (
            <div className="medal-card medal-1">
              <div className="avatar">{avatarIcon}</div>
              <p className="name">{isIndividual ? top3[0].name : top3[0].group}</p>
              <p className="score">{top3[0].score}</p>
              {isIndividual && <p className="sub">{top3[0].group}</p>}
              {isIndividual && <p className="sub">{top3[0].college}</p>}
              {isIndividual && <p className="sub">{top3[0].branch}</p>}
              <span className="medal">1</span>
            </div>
          )}
          {/* 3rd place */}
          {top3[2] && (
            <div className="medal-card medal-3">
              <div className="avatar">{avatarIcon}</div>
              <p className="name">{isIndividual ? top3[2].name : top3[2].group}</p>
              <p className="score">{top3[2].score}</p>
              {isIndividual && <p className="sub">{top3[2].group}</p>}
              {isIndividual && <p className="sub">{top3[2].college}</p>}
              {isIndividual && <p className="sub">{top3[2].branch}</p>}
              <span className="medal">3</span>
            </div>
          )}
        </div>
        <div className="others">
          {isIndividual ? (
            // Individual Leaderboard list view
            others.map((item, idx) => (
              <div key={idx} className="entry">
                <div className="entry-left">
                  <span className="rank">{idx + 4}</span>
                  <div className="info">
                    <span className="icon">{avatarIcon}</span>
                    <div className="text-info">
                      <p className="name">{item.name}</p>
                      <p className="sub">{item.college}</p>
                      <p className="sub">{item.branch}</p>
                    </div>
                  </div>
                </div>
                <span className="score-pill">{item.score}</span>
              </div>
            ))
          ) : (
            // Group Leaderboard column view (Table)
            <table className="group-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Group</th>
                  <th>Total Points</th>
                </tr>
              </thead>
              <tbody>
                {others.map((item, idx) => (
                  <tr key={idx}>
                    <td>{idx + 4}</td>
                    <td>{item.group}</td>
                    <td>{item.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-xl font-bold text-gray-700">Loading leaderboard...</p>
      </div>
    );
  }

  return (
    <>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

        body {
          font-family: 'Inter', sans-serif;
          background-color: #f0f2f5;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          margin: 0;
          padding: 0;
        }

        .main-container {
          width: 95%; /* Make it fluid */
          max-width: 800px;
          margin: 20px auto;
          padding: 1.5rem;
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          box-sizing: border-box;
        }

        .toggle-button-container {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }

        .toggle-button {
          background-color: #4f46e5;
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: 9999px; /* Tailwind's rounded-full */
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 10px rgba(79, 70, 229, 0.3);
        }

        .toggle-button:hover {
          background-color: #4338ca;
          box-shadow: 0 6px 15px rgba(79, 70, 229, 0.4);
        }

        .leaderboard-section h2 {
          text-align: center;
          color: #1f2937;
          font-size: 1.8rem;
          margin-bottom: 30px;
          letter-spacing: 1px;
        }
        
        .top-three {
          display: flex;
          flex-direction: column; /* Default stack on mobile */
          justify-content: space-around;
          align-items: center;
          margin-bottom: 30px;
        }

        .medal-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          width: 100%;
          max-width: 200px;
          margin-top: 20px; /* Add margin for spacing on mobile */
        }
        
        .medal-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
        
        .medal-1 {
          background: linear-gradient(135deg, #FFD700, #F0C10F);
          transform: scale(1.1); /* Slightly smaller scale for mobile */
          order: 1; /* Center the first place medal */
        }
        .medal-1 .avatar, .medal-1 .medal {
          border: 4px solid #FAD64B;
        }

        .medal-2 {
          background: linear-gradient(135deg, #C0C0C0, #B0B0B0);
          order: 2;
        }
        .medal-2 .avatar, .medal-2 .medal {
          border: 4px solid #D9D9D9;
        }

        .medal-3 {
          background: linear-gradient(135deg, #CD7F32, #B9661B);
          order: 3;
        }
        .medal-3 .avatar, .medal-3 .medal {
          border: 4px solid #E3944F;
        }

        .avatar {
          font-size: 3rem;
          background-color: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .medal {
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background-color: white;
          color: #1f2937;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          font-weight: 700;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }

        .name {
          font-size: 1.2rem;
          font-weight: 700;
          color: #2c3e50;
          margin: 0;
          text-transform: capitalize;
        }

        .score {
          font-size: 1.5rem;
          font-weight: 700;
          color: #34495e;
          margin: 5px 0 0;
        }

        .sub {
          font-size: 0.8rem;
          color: #7f8c8d;
          margin: 2px 0 0;
        }

        .others {
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);
        }

        .entry {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
          border-bottom: 1px solid #e0e0e0;
          transition: background-color 0.2s ease;
        }

        .entry:last-child {
          border-bottom: none;
        }

        .entry:hover {
          background-color: #f7f7f7;
        }

        .entry-left {
          display: flex;
          align-items: center;
          /* Ensure text doesn't overflow on small screens */
          min-width: 0;
        }
        
        .rank {
          font-size: 1.2rem;
          font-weight: 600;
          color: #95a5a6;
          width: 30px;
          text-align: center;
          flex-shrink: 0;
        }
        
        .info {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-left: 15px;
          /* Allow info to shrink on small screens */
          min-width: 0;
          overflow: hidden;
        }
        
        .text-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 2px;
          /* Ensure the text info column can shrink */
          min-width: 0;
        }

        .info .name {
          font-size: 1rem;
          color: #2c3e50;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .info .sub {
          font-size: 0.8rem;
          color: #7f8c8d;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .score-pill {
          background-color: #ecf0f1;
          color: #34495e;
          padding: 5px 12px;
          border-radius: 20px;
          font-weight: 600;
          min-width: 60px;
          text-align: center;
          flex-shrink: 0;
        }
        
        /* New styles for the Group Leaderboard table */
        .group-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 1rem;
          text-align: left;
        }
        
        .group-table th, .group-table td {
          padding: 12px 15px;
          border-bottom: 1px solid #e0e0e0;
        }
        
        .group-table th {
          background-color: #f7f7f7;
          font-weight: 600;
          color: #34495e;
        }
        
        .group-table tr:hover {
          background-color: #f7f7f7;
        }
        
        .group-table td:first-child {
          font-weight: 600;
          color: #95a5a6;
        }
        
        /* Media Queries for responsiveness */
        @media (min-width: 640px) {
          .top-three {
            flex-direction: row;
            align-items: flex-end;
            margin-top: 20px;
          }
          .medal-card {
            margin-top: 0;
            width: 150px;
          }
          .medal-1 {
            transform: scale(1.2);
          }
        }
        `}
      </style>
      <div className="main-container">
        <div className="toggle-button-container">
          <button onClick={handleToggle} className="toggle-button">
            {showIndividual ? "Show Group Leaderboard" : "Show Individual Leaderboard"}
          </button>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center h-screen bg-gray-100">
            <p className="text-xl font-bold text-gray-700">Loading leaderboard...</p>
          </div>
        ) : showIndividual ? (
          renderLeaderboard(individualData, true)
        ) : (
          renderLeaderboard(groupData, false)
        )}
      </div>
    </>
  );
};

export default App;