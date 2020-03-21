import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import Paper from "@material-ui/core/Paper";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
export const HKImportOther = () => {
  const [labels, setlabels] = useState([]);
  const [importCases, setimportCase] = useState([]);
  const [other, setother] = useState([]);
  const [stack, setStack] = useState();
  const [percent, setpercent] = useState();
  const [type, settype] = useState();
  const [importCasesclose, setimportCasesclose] = useState([]);

  useEffect(() => {
    axios.get("https://api.n-cov.info/case").then(data => {
      const latest = data.data.data;
      const st = [...new Set(latest.map(({ caseType }) => caseType))];

      const result = latest.reduce((r, { caseType, comfirmDate }) => {
        if (!r[comfirmDate])
          r[comfirmDate] = st.reduce((a, e) => ((a[e] = 0), a), {});
        r[comfirmDate][caseType]++;
        return r;
      }, {});

      const array = Object.entries(result).reduce((r, [k, v], i) => {
        r.comfirmDate = (r.comfirmDate || []).concat(k);
        Object.entries(v).forEach(([k, v]) => {
          if (!r[k]) r[k] = [];
          r[k][i] = v;
        });
        return r;
      }, {});
      console.log(array);

      const 可能本地個案c = [];
      const 可能本地個案的密切接觸者c = [];
      const 本地個案的密切接觸者c = [];
      const 本地個案c = [];
      const 輸入個案c = [];
      const 輸入個案的密切接觸者c = [];

      array.可能本地個案.reduce(
        (prev, curr, i) => (可能本地個案c[i] = prev + curr),
        0
      );
      array.可能本地個案的密切接觸者.reduce(
        (prev, curr, i) => (可能本地個案的密切接觸者c[i] = prev + curr),
        0
      );
      array.本地個案的密切接觸者.reduce(
        (prev, curr, i) => (本地個案的密切接觸者c[i] = prev + curr),
        0
      );
      array.本地個案.reduce((prev, curr, i) => (本地個案c[i] = prev + curr), 0);
      array.輸入個案.reduce((prev, curr, i) => (輸入個案c[i] = prev + curr), 0);
      array.輸入個案的密切接觸者.reduce(
        (prev, curr, i) => (輸入個案的密切接觸者c[i] = prev + curr),
        0
      );

      const allothersarrayofarray = [
        可能本地個案c,
        可能本地個案的密切接觸者c,
        本地個案c,
        本地個案的密切接觸者c
      ];
      const allothers = allothersarrayofarray.reduce(
        (r, a) => a.map((b, i) => (r[i] || 0) + b),
        []
      );
      setimportCase(輸入個案c);
      setlabels(array.comfirmDate);
      setimportCasesclose(輸入個案的密切接觸者c);
      setother(allothers);
      console.log(輸入個案c);
      console.log(array.comfirmDate);
      console.log(輸入個案的密切接觸者c);
      console.log(allothers);
      settype("histogram");
      setStack(true);
      setpercent("100%");
    });
  }, []);

  const percentage = () => {
    settype("histogram");
    setStack(true);
    setpercent("100%");
  };

  const barr = () => {
    settype("histogram");
    setStack(true);
    setpercent("normal");
  };

  const linee = () => {
    settype("line");
    setStack(false);
    setpercent("normal");
  };
  return (
    <Paper>
      <h2>本地－輸入</h2>
      <ButtonGroup
        variant="contained"
        color="primary"
        aria-label="outlined primary button group"
      >
        <Button onClick={percentage}>百份比%</Button>
        <Button onClick={barr}>個案</Button>
        <Button onClick={linee}>折線圖</Button>
      </ButtonGroup>
      <Chart
        options={{
          chart: {
            type: "bar",
            height: 350,
            stacked: stack,
            stackType: percent
          },
          dataLabels: {
            enabled: false
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
            name: "輸入個案",
            data: importCases
          },
          {
            name: "輸入個案的緊密接觸者",
            data: importCasesclose
          },
          {
            name: "本地個案 及 可能本地個案",
            data: other
          }
        ]}
        height="500"
        type={type}
      />
    </Paper>
  );
};

export default HKImportOther;
