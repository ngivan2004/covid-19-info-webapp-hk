import React from "react";
import "../../App.css";
import ConfirmCasesChart from "../../components/charts/ConfirmCasesChart";
import CasesIncreaseinaDayChart from "../../components/charts/CasesIncreaseinaDayChart";
import HKNewestCaseStatus from "../../components/cards/HKNewestCaseStatus";
import LastUpdate from "../../components/cards/Lastupdate";
import GlobalNewestCaseStatus from "../../components/cards/GlobalNewestCaseStatus";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ImmigrationNum from "../../components/cards/ImmigrationNum";
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
        <p style={{ fontSize: 15, fontStyle: "italic", color: "grey" }}>
          {" "}
          由於數據不準確，霍普金斯大學已於3/24起停止提供絕大部分國家（包括美國）的治愈數字。我們只會在圖表上繼續顯示治愈數字及現有確診，惟數字將不再準確，敬請見諒。{" "}
        </p>
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
        <Paper>
          <ImmigrationNum />
          <Button href="/immigration" color="primary">
            查看出入境數據>>
          </Button>
        </Paper>
      </div>
    </>
  );
}

export default HomeLeft;
