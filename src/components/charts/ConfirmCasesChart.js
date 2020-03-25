import React, { Component } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

export default class ConfirmCasesChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "line",
          animations: {
            enabled: true,
            easing: "easeinout",
            speed: 800,
            animateGradually: {
              enabled: true,
              delay: 150
            },
            dynamicAnimation: {
              enabled: true,
              speed: 600
            }
          },
          dropShadow: {
            enabled: true,
            top: 0,
            left: 0,
            blur: 3,
            opacity: 0.1
          }
        },
        xaxis: {
          categories: []
        }
      },
      series: [
        {
          name: "",
          data: []
        }
      ]
    };
  }

  componentDidMount() {
    axios
      .all([
        axios.get(
          "https://r3psfad7i6.execute-api.ap-southeast-1.amazonaws.com/Prod/figure"
        ),
        axios.get("https://api.n-cov.info/worldcomfirm"),
        axios.get("https://api.n-cov.info/worlddeath"),
        axios.get("https://api.n-cov.info/worldRecover")
      ])
      .then(
        axios.spread((hklatestD, globalconfD, globaldeathD, globalrecoverD) => {
          const hklatest = hklatestD.data.data;
          const globalconfirmlateset = globalconfD.data.data;
          const globaldeathlatest = globaldeathD.data.data;
          const globalrecoverlatest = globalrecoverD.data.data;

          // console.log(globalconfirmlateset);

          this.hklabels = [];
          this.hkcomfirmCase = [];
          this.hkfulfillReportingCriteria = [];
          this.hkinvestigation = [];
          this.hkrecover = [];
          this.hkdeath = [];
          this.globalconfirmCase = [];
          this.globaldeath = [];
          this.globalrecover = [];
          this.globallabels = [];
          this.cnconfirmCase = [];
          this.cnrecover = [];
          this.cndeath = [];
          this.hkactivecases1 = [];
          this.hkactivecasesfin = [];
          this.cnactivecases1 = [];
          this.cnactivecasesfin = [];
          this.globalactivecases1 = [];
          this.globalactivecasesfin = [];

          const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);

          hklatest.map(item => {
            this.hklabels.push(item.updateDate);
            this.hkcomfirmCase.push(item.comfirmCase);
            this.hkrecover.push(item.recover);
            this.hkdeath.push(item.death);
            return true;
          });

          Object.values(globalconfirmlateset).map(item => {
            this.globalconfirmCase.push(sumValues(item));
            this.cnconfirmCase.push(item.China);
            return true;
          });
          Object.keys(globalconfirmlateset).map(item => {
            this.globallabels.push(item);
            return true;
          });
          // console.log(this.globallabels);
          Object.values(globaldeathlatest).map(item => {
            this.globaldeath.push(sumValues(item));
            this.cndeath.push(item.China);
            return true;
          });
          Object.values(globalrecoverlatest).map(item => {
            this.globalrecover.push(sumValues(item));
            this.cnrecover.push(item.China);
            return true;
          });
          for (let i = 0; i <= this.hkdeath.length - 1; i++)
            this.hkactivecases1.push(this.hkcomfirmCase[i] - this.hkdeath[i]);
          for (let i = 0; i <= this.hkrecover.length - 1; i++)
            this.hkactivecasesfin.push(
              this.hkactivecases1[i] - this.hkrecover[i]
            );
          for (let i = 0; i <= this.cndeath.length - 1; i++)
            this.cnactivecases1.push(this.cnconfirmCase[i] - this.cndeath[i]);
          for (let i = 0; i <= this.cnrecover.length - 1; i++)
            this.cnactivecasesfin.push(
              this.cnactivecases1[i] - this.cnrecover[i]
            );
          for (let i = 0; i <= this.globaldeath.length - 1; i++)
            this.globalactivecases1.push(
              this.globalconfirmCase[i] - this.globaldeath[i]
            );
          for (let i = 0; i <= this.globalrecover.length - 1; i++)
            this.globalactivecasesfin.push(
              this.globalactivecases1[i] - this.globalrecover[i]
            );

          // console.log(this.globalconfirmCase);
          this.setState({
            options: {
              ...this.state.options,
              xaxis: {
                categories: this.hklabels
              },
              colors: ["#ff0000", "#33cc33", "#000000", "#FF8C00"]
            },
            series: [
              {
                name: "累積確診",
                data: this.hkcomfirmCase
              },
              {
                name: "出院人數",
                data: this.hkrecover
              },
              {
                name: "死亡人數",
                data: this.hkdeath
              },
              {
                name: "現有確診",
                data: this.hkactivecasesfin
              }
            ]
          });
        })
      );
  }

  globalonClick = () => {
    this.setState({
      options: {
        ...this.state.options,
        xaxis: {
          categories: this.globallabels
        },
        colors: ["#ff0000", "#33cc33", "#000000", "#FF8C00"]
      },
      series: [
        {
          name: "累積確診",
          data: this.globalconfirmCase
        },
        {
          name: "出院人數",
          data: this.globalrecover
        },
        {
          name: "死亡人數",
          data: this.globaldeath
        },
        {
          name: "現有確診",
          data: this.globalactivecasesfin
        }
      ]
    });
  };

  hkonClick = () => {
    this.setState({
      options: {
        ...this.state.options,
        xaxis: {
          categories: this.hklabels
        },
        colors: ["#ff0000", "#33cc33", "#000000", "#FF8C00"]
      },
      series: [
        {
          name: "累積人數",
          data: this.hkcomfirmCase
        },
        {
          name: "出院人數",
          data: this.hkrecover
        },
        {
          name: "死亡人數",
          data: this.hkdeath
        },
        {
          name: "現有確診",
          data: this.hkactivecasesfin
        }
      ]
    });
  };

  cnonClick = () => {
    this.setState({
      options: {
        ...this.state.options,
        xaxis: {
          categories: this.globallabels
        },
        colors: ["#ff0000", "#33cc33", "#000000", "#FF8C00"]
      },
      series: [
        {
          name: "累積確診",
          data: this.cnconfirmCase
        },
        {
          name: "出院人數",
          data: this.cnrecover
        },
        {
          name: "死亡人數",
          data: this.cndeath
        },
        {
          name: "現有確診",
          data: this.cnactivecasesfin
        }
      ]
    });
  };

  render() {
    return (
      <Paper>
        <h2>累積個案</h2>

        <div>
          <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="outlined primary button group"
          >
            <Button onClick={this.hkonClick}>香港</Button>
            <Button onClick={this.cnonClick}>中國</Button>
            <Button onClick={this.globalonClick}>全球</Button>
          </ButtonGroup>
        </div>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height="350"
        />
      </Paper>
    );
  }
}
