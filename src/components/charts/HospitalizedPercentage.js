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
        "https://r3psfad7i6.execute-api.ap-southeast-1.amazonaws.com/Prod/case"
      )
      .then(data => {
        const latest = data.data.data;

        var _hospitalized = latest.filter(function(stat) {
          return stat.status == "住院";
        });

        var _awaiting = latest.filter(function(stat) {
          return stat.status == "待入院";
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
            name: "未能入院",
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
