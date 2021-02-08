import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import Paper from "@material-ui/core/Paper";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
export const AgeStatus = () => {
  const [labels, setlabels] = useState([]);
  const [hospitalized, setHospitalized] = useState();
  const [awaiting, setawaiting] = useState();
  const [stack, setStack] = useState();
  const [percent, setpercent] = useState();
  const [type, settype] = useState();

  useEffect(() => {
    axios
      .get(
        "https://api.data.gov.hk/v2/filter?q=%7B%22resource%22%3A%22http%3A%2F%2Fwww.chp.gov.hk%2Ffiles%2Fmisc%2Fenhanced_sur_covid_19_eng.csv%22%2C%22section%22%3A1%2C%22format%22%3A%22json%22%7D"
      )
      .then(data => {
        const latest = data.data;

        var _hospitalized = latest.filter(function(stat) {
          return stat["Hospitalised/Discharged/Deceased"] == "Hospitalised";
        });

        var _awaiting = latest.filter(function(stat) {
          return stat["Hospitalised/Discharged/Deceased"] == "To be provided";
        });

        var hospitalizedNum = [Object.keys(_hospitalized).length];
        var awaitingnum = [Object.keys(_awaiting).length];

        console.log(hospitalizedNum);
        console.log(awaitingnum);
        setHospitalized(hospitalizedNum);
        setawaiting(awaitingnum);
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
      <Chart
        options={{
          dataLabels: {
            enabled: true,
            textAnchor: "middle",
            style: {
              colors: ["#fff"]
            },
            formatter: function(val) {
              return Math.round(val) + "%";
            },
            offsetX: 0,
            dropShadow: {
              enabled: true
            }
          },
          chart: {
            type: "bar",
            height: 10,
            stacked: true,
            stackType: percent
          },
          plotOptions: {
            bar: {
              horizontal: true
            }
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
            categories: ["現有"]
          },

          colors: ["#0000FF", "#ff0000"],
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
            name: "住院中",
            data: hospitalized
          },

          {
            name: "待確認",
            data: awaiting
          }
        ]}
        type="bar"
        height="150"
      />
    </Paper>
  );
};

export default AgeStatus;
