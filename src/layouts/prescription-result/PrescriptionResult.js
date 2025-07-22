import React, { useState } from "react";
import "./PrescriptionResult.css";

const dummyResults = [
  {
    id: 1,
    title: "Warfarin + Ibuprofen",
    timestamp: "2025-07-20 09:32 AM",
    interactions: [
      {
        severity: "Major",
        drugs: "warfarin ↔ ibuprofen",
        description:
          "NSAIDs may increase bleeding risk with warfarin due to inhibition of platelet function and GI tract irritation.",
        details:
          "Warfarin is an anticoagulant, and NSAIDs like ibuprofen may further impair clotting. Use alternatives if possible.",
      },
      {
        severity: "Moderate",
        drugs: "warfarin ↔ amoxicillin",
        description:
          "Amoxicillin may alter gut flora responsible for vitamin K production, enhancing warfarin’s effect.",
        details:
          "The change in gut flora could reduce vitamin K absorption, thus increasing bleeding risk.",
      },
    ],
  },
  {
    id: 2,
    title: "Metformin + Alcohol",
    timestamp: "2025-07-18 03:45 PM",
    interactions: [
      {
        severity: "Major",
        drugs: "metformin ↔ alcohol",
        description:
          "Acute alcohol intake may potentiate the effect of metformin on lactate metabolism, leading to lactic acidosis.",
        details:
          "Avoid alcohol when using metformin. Lactic acidosis is rare but serious.",
      },
      {
        severity: "Minor",
        drugs: "metformin ↔ aspirin",
        description:
          "High-dose aspirin may slightly decrease renal clearance of metformin.",
        details: "Usually not clinically significant at low aspirin doses.",
      },
    ],
  },
  {
    id: 3,
    title: "Simvastatin + Grapefruit Juice",
    timestamp: "2025-07-17 02:15 PM",
    interactions: [
      {
        severity: "Major",
        drugs: "simvastatin ↔ grapefruit juice",
        description:
          "Grapefruit juice can increase the concentration of simvastatin in the blood, raising the risk of muscle toxicity.",
        details:
          "Inhibits CYP3A4 enzymes in the intestine, leading to significantly higher drug levels. Myopathy and rhabdomyolysis are potential risks.",
      },
    ],
  },
  {
    id: 4,
    title: "Lisinopril + Potassium Supplement",
    timestamp: "2025-07-16 10:05 AM",
    interactions: [
      {
        severity: "Moderate",
        drugs: "lisinopril ↔ potassium",
        description:
          "ACE inhibitors like lisinopril can increase potassium levels. Supplementing potassium may cause hyperkalemia.",
        details:
          "Monitor serum potassium regularly. Symptoms of hyperkalemia include weakness, confusion, and irregular heartbeat.",
      },
    ],
  },
  {
    id: 5,
    title: "Levothyroxine + Calcium Carbonate",
    timestamp: "2025-07-15 08:50 AM",
    interactions: [
      {
        severity: "Minor",
        drugs: "levothyroxine ↔ calcium carbonate",
        description:
          "Calcium can interfere with absorption of levothyroxine if taken simultaneously.",
        details:
          "Space doses at least 4 hours apart. This reduces the risk of decreased thyroid hormone efficacy.",
      },
    ],
  },
];

const Result = () => {
  const [selectedResult, setSelectedResult] = useState(null);
  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const [search, setSearch] = useState("");

  const filteredResults = dummyResults.filter((result) =>
    result.title.toLowerCase().includes(search.toLowerCase())
  );

  const toggleDetail = (index) => {
    setExpandedIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="result-page">
      <div className={`recent-results ${selectedResult ? "blur" : ""}`}>
        {/* Header  */}
        <h2>Recent Results</h2>
        {/* Search Bar  */}
        <input
          className="search-bar"
          type="text"
          placeholder="Search medicine..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* Results List  */}
        <ul className="result-list">
          {filteredResults.length > 0 ? (
            filteredResults.map((result) => (
              <li
                key={result.id}
                className="result-item"
                onClick={() => {
                  setSelectedResult(result);
                  setExpandedIndexes([]);
                }}
              >
                <div className="title">{result.title}</div>
                <div className="timestamp">{result.timestamp}</div>
              </li>
            ))
          ) : (
            <li className="no-results">No results found.</li>
          )}
        </ul>
      </div>

      {/* Popup for selected result */}
      {selectedResult && (
        <div className="popup-overlay">
          <div className="popup">
            {/* Close Button  */}
            <button
              className="close-btn"
              onClick={() => setSelectedResult(null)}
            >
              ✕
            </button>
            <div className="popup-content">
              {selectedResult.interactions.map((interaction, idx) => (
                <div className="interaction" key={idx}>
                  <span
                    className={`severity ${interaction.severity.toLowerCase()}`}
                  >
                    {interaction.severity}
                  </span>
                  <h3>{interaction.drugs}</h3>
                  <p>{interaction.description}</p>
                  {/* View Detail Button  */}
                  <button
                    className="view-detail"
                    onClick={() => toggleDetail(idx)}
                  >
                    {expandedIndexes.includes(idx)
                      ? "Hide details"
                      : "View details"}
                  </button>
                  {expandedIndexes.includes(idx) && (
                    <div className="extra-detail">{interaction.details}</div>
                  )}
                  {idx !== selectedResult.interactions.length - 1 && <hr />}
                </div>
              ))}
              <button className="save-btn">SAVE</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;
