import React from "react";
import "../../App.css";
import ConfirmCasesChart from "../../components/charts/ConfirmCasesChart";
import CasesIncreaseinaDayChart from "../../components/charts/CasesIncreaseinaDayChart";
import GlobalNewestCaseStatus from "../../components/cards/GlobalNewestCaseStatus";
import LastUpdate from "../../components/cards/Lastupdate";

const section = {
  padding: 10,
  backgroundColor: "#fff"
};

const top = {
  paddingTop: 0,
  backgroundColor: "#fff"
};

function GlobalLeft() {
  return (
    <>
      <div style={section}>
        <div style={top}>
          <hr />
        </div>

        <GlobalNewestCaseStatus />
      </div>
    </>
  );
}

export default GlobalLeft;
