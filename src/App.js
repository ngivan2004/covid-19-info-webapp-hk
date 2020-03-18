import React from "react";
import "./App.css";
import ConfirmCasesChart from "./components/charts/ConfirmCasesChart";
import CasesIncreaseinaDayChart from "./components/charts/CasesIncreaseinaDayChart";
import HKNewestCaseStatus from "./components/cards/HKNewestCaseStatus";
import AppAppbar from "./components/navigation/AppAppbar";
import LastUpdate from "./components/cards/Lastupdate";

const section = {
  padding: 10,
  backgroundColor: "#fff"
};

const top = {
  paddingTop: 40,
  backgroundColor: "#fff"
};

function App() {
  return (
    <>
      <AppAppbar />
      <div style={section}>
        <div style={top}>
          <LastUpdate />
        </div>
        <HKNewestCaseStatus />
        <ConfirmCasesChart />
        <CasesIncreaseinaDayChart />
      </div>
    </>
  );
}

export default App;
