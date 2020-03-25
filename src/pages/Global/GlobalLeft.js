import React from "react";
import "../../App.css";
import ConfirmCasesChart from "../../components/charts/ConfirmCasesChart";
import CasesIncreaseinaDayChart from "../../components/charts/CasesIncreaseinaDayChart";
import GlobalNewestCaseStatus from "../../components/cards/GlobalNewestCaseStatus";
import LastUpdate from "../../components/cards/Lastupdate";

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
          <p style={{ fontSize: 15, fontStyle: "italic", color: "grey" }}>
            {" "}
            由於數據不準確，霍普金斯大學已於3/24起停止提供絕大部分國家（包括美國）的治愈數字。我們只會在圖表上繼續顯示治愈數字及現有確診，惟數字將不再準確，敬請見諒。{" "}
          </p>
        </div>

        <GlobalNewestCaseStatus />
      </div>
    </>
  );
}

export default GlobalLeft;
