import React from "react";
import "../../App.css";
import ConfirmCasesChart from "../../components/charts/ConfirmCasesChart";
import CasesIncreaseinaDayChart from "../../components/charts/CasesIncreaseinaDayChart";
import HKNewestCaseStatus from "../../components/cards/HKNewestCaseStatus";
import LastUpdate from "../../components/cards/Lastupdate";

const section = {
  padding: 10,
  backgroundColor: "#F5F5F6"
};

const top = {
  paddingTop: 0,
  backgroundColor: "#F5F5F6"
};

function HomeLeft() {
  return (
    <>
      <div style={section}>
        <div style={top}>
          <hr />
        </div>

        <HKNewestCaseStatus />
      </div>
    </>
  );
}

export default HomeLeft;
