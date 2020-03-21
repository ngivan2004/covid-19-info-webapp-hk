import React from "react";
import "../../App.css";
import ConfirmCasesChart from "../../components/charts/ConfirmCasesChart";
import CasesIncreaseinaDayChart from "../../components/charts/CasesIncreaseinaDayChart";
import HKNewestCaseStatus from "../../components/cards/HKNewestCaseStatus";
import LastUpdate from "../../components/cards/Lastupdate";

const section = {
  padding: 10,
  backgroundColor: "#fff"
};

const top = {
  paddingTop: 0,
  backgroundColor: "#fff"
};

function HomeLeft() {
  return (
    <>
      <div style={section}>
        <div style={top}>
          <hr />
        </div>

        <HKNewestCaseStatus />
        <LastUpdate />
      </div>
    </>
  );
}

export default HomeLeft;
