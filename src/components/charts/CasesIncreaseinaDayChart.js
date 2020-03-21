import React, { Component } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

export default class CasesIncreaseinaDayChart extends Component {
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
          this.hknewcomfirmCase = [];
          this.hknewdeath = [];
          this.hknewrecover = [];
          this.cnnewconfirmCase = [];
          this.cnnewdeath = [];
          this.cnnewrecover = [];
          this.globalnewconfirmCase = [];
          this.globalnewdeath = [];
          this.globalnewrecover = [];

          this.hkyestcomfirmCase = [];
          this.hkyestdeath = [];
          this.hkyestrecover = [];
          this.cnyestconfirmCase = [];
          this.cnyestwdeath = [];
          this.cnyestrecover = [];
          this.globalyestconfirmCase = [];
          this.globalyestdeath = [];
          this.globalyestrecover = [];

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
          //hkcases make daily increase
          //hkconfirm new
          this.hkyestcomfirmCase = this.hkcomfirmCase.slice();
          this.hkyestcomfirmCase.unshift(0);
          this.hkyestcomfirmCase.pop();
          for (let i = 0; i <= this.hkyestcomfirmCase.length - 1; i++)
            this.hknewcomfirmCase.push(
              this.hkcomfirmCase[i] - this.hkyestcomfirmCase[i]
            );
          //hkrecover new
          this.hkyestrecover = this.hkrecover.slice();
          this.hkyestrecover.unshift(0);
          this.hkyestrecover.pop();
          for (let i = 0; i <= this.hkyestrecover.length - 1; i++)
            this.hknewrecover.push(this.hkrecover[i] - this.hkyestrecover[i]);
          //hkdeath new
          this.hkyestdeath = this.hkdeath.slice();
          this.hkyestdeath.unshift(0);
          this.hkyestdeath.pop();
          for (let i = 0; i <= this.hkyestdeath.length - 1; i++)
            this.hknewdeath.push(this.hkdeath[i] - this.hkyestdeath[i]);
          //cncases make daily increase
          //cnconfirm new
          this.cnyestconfirmCase = this.cnconfirmCase.slice();
          this.cnyestconfirmCase.unshift(0);
          this.cnyestconfirmCase.pop();
          for (let i = 0; i <= this.cnyestconfirmCase.length - 1; i++)
            this.cnnewconfirmCase.push(
              this.cnconfirmCase[i] - this.cnyestconfirmCase[i]
            );
          //cnrecover new
          this.cnyestrecover = this.cnrecover.slice();
          this.cnyestrecover.unshift(0);
          this.cnyestrecover.pop();
          for (let i = 0; i <= this.cnyestrecover.length - 1; i++)
            this.cnnewrecover.push(this.cnrecover[i] - this.cnyestrecover[i]);
          //cndeath new
          this.cnyestdeath = this.cndeath.slice();
          this.cnyestdeath.unshift(0);
          this.cnyestdeath.pop();
          for (let i = 0; i <= this.cnyestdeath.length - 1; i++)
            this.cnnewdeath.push(this.cndeath[i] - this.cnyestdeath[i]);
          //globalcases make daily increase
          //globalconfirm new
          this.globalyestconfirmCase = this.globalconfirmCase.slice();
          this.globalyestconfirmCase.unshift(0);
          this.globalyestconfirmCase.pop();
          for (let i = 0; i <= this.globalyestconfirmCase.length - 1; i++)
            this.globalnewconfirmCase.push(
              this.globalconfirmCase[i] - this.globalyestconfirmCase[i]
            );
          //globalrecover new
          this.globalyestrecover = this.globalrecover.slice();
          this.globalyestrecover.unshift(0);
          this.globalyestrecover.pop();
          for (let i = 0; i <= this.globalyestrecover.length - 1; i++)
            this.globalnewrecover.push(
              this.globalrecover[i] - this.globalyestrecover[i]
            );
          //globaldeath new
          this.globalyestdeath = this.globaldeath.slice();
          this.globalyestdeath.unshift(0);
          this.globalyestdeath.pop();
          for (let i = 0; i <= this.globalyestdeath.length - 1; i++)
            this.globalnewdeath.push(
              this.globaldeath[i] - this.globalyestdeath[i]
            );

          // console.log(this.globalconfirmCase);
          this.setState({
            options: {
              ...this.state.options,
              xaxis: {
                categories: this.hklabels
              },
              colors: ["#ff0000", "#33cc33", "#000000"]
            },
            series: [
              {
                name: "新增確診",
                data: this.hknewcomfirmCase
              },
              {
                name: "新增出院",
                data: this.hknewrecover
              },
              {
                name: "新增死亡",
                data: this.hknewdeath
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
        colors: ["#ff0000", "#33cc33", "#000000"]
      },
      series: [
        {
          name: "新增確診",
          data: this.globalnewconfirmCase
        },
        {
          name: "新增出院",
          data: this.globalnewrecover
        },
        {
          name: "新增死亡",
          data: this.globalnewdeath
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
        colors: ["#ff0000", "#33cc33", "#000000"]
      },
      series: [
        {
          name: "新增確診",
          data: this.hknewcomfirmCase
        },
        {
          name: "新增出院",
          data: this.hknewrecover
        },
        {
          name: "新增死亡",
          data: this.hknewdeath
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
        colors: ["#ff0000", "#33cc33", "#000000"]
      },
      series: [
        {
          name: "新增確診",
          data: this.cnnewconfirmCase
        },
        {
          name: "新增出院",
          data: this.cnnewrecover
        },
        {
          name: "新增死亡",
          data: this.cnnewdeath
        }
      ]
    });
  };

  render() {
    return (
      <Paper>
        <h2>每日新增個案</h2>
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
