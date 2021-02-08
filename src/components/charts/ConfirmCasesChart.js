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
          "https://api.data.gov.hk/v2/filter?q=%7B%22resource%22%3A%22http%3A%2F%2Fwww.chp.gov.hk%2Ffiles%2Fmisc%2Flatest_situation_of_reported_cases_covid_19_eng.csv%22%2C%22section%22%3A1%2C%22format%22%3A%22json%22%7D"
        ),
        axios.get("https://covid.ourworldindata.org/data/owid-covid-data.json/"),
        //axios.get("https://api.n-cov.info/worlddeath"),
        //axios.get("https://api.n-cov.info/worldRecover")
      ])
      .then(
        axios.spread((hklatestD, globalconfD, globaldeathD, globalrecoverD) => {
          const hklatest = hklatestD.data;
          const globallatest = globalconfD.data.OWID_WRL.data;
          //const globaldeathlatest = globaldeathD.data.data;
          //const globalrecoverlatest = globalrecoverD.data.data;

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
          console.log(this.hkcomfirmCase);
          hklatest.map(item => {
            this.hklabels.push(item["As of date"]);
            this.hkcomfirmCase.push(item["Number of confirmed cases"]);
            this.hkrecover.push(item["Number of discharge cases"]);
            this.hkdeath.push(item["Number of death cases"]);
            return true;
          });
          for (let i = 0; i <= this.hkrecover.length - 1; i++)
            this.hkactivecasesfin.push(
              this.hkcomfirmCase[i] - this.hkrecover[i] - this.hkdeath[i]
            );
/*          Object.values(globalconfirmlateset).map(item => {
            this.globalconfirmCase.push(sumValues(item));
            this.cnconfirmCase.push(item.China);
            return true;
          });
          */
         globallatest.map(item => {
          this.globallabels.push(item["date"]);
          this.globalconfirmCase.push(item["total_cases"]);
          this.globaldeath.push(item["new_cases"]);
          return true;
        });
          
           console.log(this.globallabels);
          /*
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
*/
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
        <h2 style={{ padding: 10 }}>累積個案</h2>

        <div style={{ paddingLeft: 10 }}>
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
