import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import Paper from "@material-ui/core/Paper";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
export const AgeStatus = () => {
  const [labels, setlabels] = useState([]);
  const [death, setdeath] = useState([]);
  const [active, setactive] = useState([]);
  const [recover, setrecover] = useState([]);
  const [dangerous, setdangerous] = useState([]);
  const [severe, setsevere] = useState([]);
  const [stack, setStack] = useState();
  const [percent, setpercent] = useState();
  const [type, settype] = useState();

  useEffect(() => {
    axios
      .get(
        "https://r3psfad7i6.execute-api.ap-southeast-1.amazonaws.com/Prod/case"
      )
      .then(data => {
        const latest = data.data.data;

        var _0110 = latest.filter(function(agge) {
          return agge.age <= 10 && agge.age >= 1;
        });

        var _1120 = latest.filter(function(agge) {
          return agge.age <= 20 && agge.age >= 11;
        });

        var _2130 = latest.filter(function(agge) {
          return agge.age <= 30 && agge.age >= 21;
        });
        var _3140 = latest.filter(function(agge) {
          return agge.age <= 40 && agge.age >= 31;
        });
        var _4150 = latest.filter(function(agge) {
          return agge.age <= 50 && agge.age >= 41;
        });
        var _5160 = latest.filter(function(agge) {
          return agge.age <= 60 && agge.age >= 51;
        });
        var _6170 = latest.filter(function(agge) {
          return agge.age <= 70 && agge.age >= 61;
        });
        var _7180 = latest.filter(function(agge) {
          return agge.age <= 80 && agge.age >= 71;
        });
        var _8190 = latest.filter(function(agge) {
          return agge.age <= 90 && agge.age >= 81;
        });
        var _91plus = latest.filter(function(agge) {
          return agge.age >= 90;
        });
        var _0110death = _0110.filter(item => item.status === "死亡").length;
        console.log(_0110death);

        var _0110recover = _0110.filter(item => item.status === "出院").length;
        console.log(_0110recover);
        var _1120death = _1120.filter(item => item.status === "死亡").length;
        console.log(_1120death);
        var _1120recover = _1120.filter(item => item.status === "出院").length;
        console.log(_1120recover);
        var _2130death = _2130.filter(item => item.status === "死亡").length;
        console.log(_2130death);
        var _2130recover = _2130.filter(item => item.status === "出院").length;
        console.log(_2130recover);
        var _3140death = _3140.filter(item => item.status === "死亡").length;
        console.log(_3140death);
        var _3140recover = _3140.filter(item => item.status === "出院").length;
        console.log(_3140recover);
        var _4150death = _4150.filter(item => item.status === "死亡").length;
        console.log(_4150death);
        var _4150recover = _4150.filter(item => item.status === "出院").length;
        console.log(_4150recover);
        var _5160death = _5160.filter(item => item.status === "死亡").length;
        console.log(_5160death);
        var _5160recover = _5160.filter(item => item.status === "出院").length;
        console.log(_5160recover);
        var _6170death = _6170.filter(item => item.status === "死亡").length;
        console.log(_6170death);
        var _6170recover = _6170.filter(item => item.status === "出院").length;
        console.log(_6170recover);
        var _7180death = _7180.filter(item => item.status === "死亡").length;
        console.log(_7180death);
        var _7180recover = _7180.filter(item => item.status === "出院").length;
        console.log(_7180recover);
        var _8190death = _8190.filter(item => item.status === "死亡").length;
        console.log(_8190death);
        var _8190recover = _8190.filter(item => item.status === "出院").length;
        console.log(_8190recover);
        var _91plusdeath = _91plus.filter(item => item.status === "死亡")
          .length;
        console.log(_91plusdeath);
        var _91plusrecover = _91plus.filter(item => item.status === "出院")
          .length;
        console.log(_91plusrecover);
        var latestdeath = latest.filter(item => item.status === "死亡").length;
        console.log(latestdeath);
        var latestrecover = latest.filter(item => item.status === "出院")
          .length;
        console.log(latestrecover);
        var _0110active = _0110.filter(item => item.status === "住院").length;
        console.log(_0110active);

        var _1120active = _1120.filter(item => item.status === "住院").length;
        console.log(_1120active);

        var _2130active = _2130.filter(item => item.status === "住院").length;
        console.log(_2130active);

        var _3140active = _3140.filter(item => item.status === "住院").length;
        console.log(_3140active);

        var _4150active = _4150.filter(item => item.status === "住院").length;
        console.log(_4150active);

        var _5160active = _5160.filter(item => item.status === "住院").length;
        console.log(_5160active);

        var _6170active = _6170.filter(item => item.status === "住院").length;
        console.log(_6170active);

        var _7180active = _7180.filter(item => item.status === "住院").length;
        console.log(_7180active);

        var _8190active = _8190.filter(item => item.status === "住院").length;
        console.log(_8190active);

        var _91plusactive = _91plus.filter(item => item.status === "住院")
          .length;
        console.log(_91plusactive);

        var latestactive = latest.filter(item => item.status === "住院").length;
        console.log(latestactive);

        setdeath([
          _0110death,
          _1120death,
          _2130death,
          _3140death,
          _4150death,
          _5160death,
          _6170death,
          _7180death,
          _8190death,
          _91plusdeath
        ]);
        setlabels([
          "0-10",
          "11-20",
          "21-30",
          "31-40",
          "41-50",
          "51-60",
          "61-70",
          "71-80",
          "81-90",
          "91+"
        ]);
        setrecover([
          _0110recover,
          _1120recover,
          _2130recover,
          _3140recover,
          _4150recover,
          _5160recover,
          _6170recover,
          _7180recover,
          _8190recover,
          _91plusrecover
        ]);
        setactive([
          _0110active,
          _1120active,
          _2130active,
          _3140active,
          _4150active,
          _5160active,
          _6170active,
          _7180active,
          _8190active,
          _91plusactive
        ]);

        settype("bar");
        setStack(true);
        setpercent("100%");
      });
  }, []);

  const percentage = () => {
    settype("bar");
    setStack(true);
    setpercent("100%");
  };

  const barr = () => {
    settype("bar");
    setStack(true);
    setpercent("normal");
  };

  return (
    <Paper>
      <h2>按患者年齡－狀態</h2>
      <ButtonGroup
        variant="contained"
        color="primary"
        aria-label="outlined primary button group"
      >
        <Button onClick={percentage}>百份比%</Button>
        <Button onClick={barr}>個案</Button>
      </ButtonGroup>
      <Chart
        options={{
          dataLabels: {
            enabled: false
          },
          chart: {
            type: "bar",
            height: 350,
            stacked: true,
            stackType: percent
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                legend: {
                  position: "bottom",
                  offsetX: -10,
                  offsetY: 0
                }
              }
            }
          ],
          xaxis: {
            categories: labels
          },
          colors: ["#000000", "#ff0000", "#33cc33"],
          fill: {
            opacity: 1
          },
          legend: {
            position: "right",
            offsetX: 0,
            offsetY: 50
          }
        }}
        series={[
          {
            name: "死亡",
            data: death
          },

          {
            name: "住院",
            data: active
          },
          {
            name: "出院",
            data: recover
          }
        ]}
        type="bar"
        height="350"
      />
    </Paper>
  );
};

export default AgeStatus;
