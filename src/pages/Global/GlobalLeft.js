import React from "react";
import "../../App.css";

import GlobalNewestCaseStatus from "../../components/cards/GlobalNewestCaseStatus";

import WorldMap from "../../components/maps/WorldMap";

const section = {
  padding: 5
};

const top = {
  paddingTop: 0
};

function GlobalLeft() {
  return (
    <>
      <div style={section}>
        <div style={top}>
          <h1>全球疫情</h1>

          <hr />
          <p style={{ fontSize: 12, fontStyle: "italic", color: "grey" }}>
            {" "}
            由於數據不準確，霍普金斯大學已於3/24起停止提供絕大部分國家（包括美國）的治愈數字。我們只會繼續顯示歷史治愈數字及歷史現有確診數字，敬請見諒。{" "}
          </p>
        </div>

        <GlobalNewestCaseStatus />
        <WorldMap />
      </div>
    </>
  );
}

export default GlobalLeft;
