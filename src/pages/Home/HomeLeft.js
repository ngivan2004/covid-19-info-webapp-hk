import React, { useState, useEffect } from "react";
import "../../App.css";
import ConfirmCasesChart from "../../components/charts/ConfirmCasesChart";
import CasesIncreaseinaDayChart from "../../components/charts/CasesIncreaseinaDayChart";
import HKNewestCaseStatus from "../../components/cards/HKNewestCaseStatus";

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
  const [datee, setDatee] = useState();
  const [greet, setGreet] = useState();
  useEffect(() => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date();
    const secondDate = new Date(2020, 0, 22);
    var time = firstDate.getHours();
    setDatee(Math.round(Math.abs((firstDate - secondDate) / oneDay)));
    if (time < 12) {
      setGreet("早晨");
    }
    if (time >= 12 && time < 18) {
      setGreet("午安");
    }
    if (time > 18) {
      setGreet("晚安");
    }
  }, []);
  return (
    <>
      <div style={section}>
        <div style={top}>
          <hr />
        </div>
        <p style={{ fontSize: 12, fontStyle: "italic", color: "grey" }}>
          {" "}
          由於數據不準確，霍普金斯大學已於3/24起停止提供絕大部分國家（包括美國）的治愈數字。我們只會繼續顯示歷史治愈數字及歷史現有確診數字，敬請見諒。{" "}
        </p>
        <Paper>
          <p>
            {greet}，今天是香港人一起抗疫的第{datee}
            天。請繼續保持警覺，不要鬆懈，一同對抗疫情。
          </p>
        </Paper>
        <Paper>
          <HKNewestCaseStatus />
          <Button href="/hkindepth" color="primary">
            查看香港地區深入數據分析>>
          </Button>
        </Paper>
        <ConfirmCasesChart />
        <CasesIncreaseinaDayChart />
      </div>
    </>
  );
}

export default HomeLeft;
