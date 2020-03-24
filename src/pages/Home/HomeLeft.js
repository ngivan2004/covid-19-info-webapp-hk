import React from "react";
import "../../App.css";
import ConfirmCasesChart from "../../components/charts/ConfirmCasesChart";
import CasesIncreaseinaDayChart from "../../components/charts/CasesIncreaseinaDayChart";
import HKNewestCaseStatus from "../../components/cards/HKNewestCaseStatus";
import LastUpdate from "../../components/cards/Lastupdate";
import GlobalNewestCaseStatus from "../../components/cards/GlobalNewestCaseStatus";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
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
        <Paper>
          <HKNewestCaseStatus />
          <Button href="/hkindepth" color="primary">
            查看香港地區深入數據分析>>
          </Button>
        </Paper>
        <Paper>
          <GlobalNewestCaseStatus />
          <Button href="/global" color="primary">
            查看全球疫情>>
          </Button>
        </Paper>
      </div>
    </>
  );
}

export default HomeLeft;
