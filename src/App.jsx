import React, { useEffect, useState } from "react";
import "./Leaderboard.css";

// Use publicly accessible CSV URLs for testing.
// Replace these with your published Google Sheets URLs.
const GROUP_CSV =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQnyK6bwwFnl7a2z6UMH_u4mHjmQVkT3a01_phwKBNV3eXtlhy9AoTd63FBS4RK2s-bnkLQSSgq0Tbh/pub?output=csv";

const INDIVIDUAL_CSV =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRC6v9A625r9zDHwIlvifUg1qtLtPgMREyxx1yfny6i36UulsqtIBgejbhaxCZ3Y0jTcAWM4L4yItze/pub?output=csv";

const Leaderboard = () => {
  const [groupData, setGroupData] = useState([]);
  const [individualData, setIndividualData] = useState([]);
  const [showIndividual, setShowIndividual] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      const url = showIndividual ? INDIVIDUAL_CSV : GROUP_CSV;

      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const text = await res.text();
        const rows = text.trim().split("\n").slice(1); // remove header

        if (showIndividual) {
          const formatted = rows
            .map((row) => {
              const cols = row.split(",");
              if (cols.length < 5) return null;

              const [name, group, branch, college, scoreStr] = cols;
              return {
                name: name?.trim() || "",
                group: group?.trim() || "",
                branch: branch?.trim() || "",
                college: college?.trim() || "",
                score: Number(scoreStr?.trim()) || 0,
              };
            })
            .filter((i) => i && i.name);

          formatted.sort((a, b) => b.score - a.score);
          setIndividualData(formatted);
        } else {
          const formatted = rows
            .map((row) => {
              const cols = row.split(",");
              if (cols.length < 2) return null;

              const [group, scoreStr] = cols;
              return {
                group: group?.trim() || "",
                score: Number(scoreStr?.trim()) || 0,
              };
            })
            .filter((i) => i && i.group);

          formatted.sort((a, b) => b.score - a.score);
          setGroupData(formatted);
        }
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load data. Please check the CSV URLs.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [showIndividual]);

  return (
    <div className="leaderboard-container">
      <div className="toggle-buttons">
        <button
          onClick={() => setShowIndividual(false)}
          className={!showIndividual ? "active" : ""}
        >
          Group
        </button>
        <button
          onClick={() => setShowIndividual(true)}
          className={showIndividual ? "active" : ""}
        >
          Individual
        </button>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      {!isLoading && !error && (
        <table>
          <thead>
            <tr>
              <th>Position</th>
              {showIndividual ? (
                <>
                  <th>Name</th>
                  
                  <th>Branch</th>
                  <th>College</th>
                  <th>Score</th>
                </>
              ) : (
                <>
                  <th>Group</th>
                  <th>Score</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {(showIndividual ? individualData : groupData).map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {showIndividual ? (
                  <>
                    <td>{item.name}</td>
                    
                    <td>{item.branch}</td>
                    <td>{item.college}</td>
                    <td>{item.score}</td>
                  </>
                ) : (
                  <>
                    <td>{item.group}</td>
                    <td>{item.score}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard;