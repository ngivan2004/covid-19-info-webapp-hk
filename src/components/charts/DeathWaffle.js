import { ResponsiveWaffle } from "@nivo/waffle";
import React, { Component } from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import _ from "lodash";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

export default class DeathWaffle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          id: "出院",
          label: "出院",
          value: 100,
          color: "#4E5A65"
        },
        {
          id: "死亡",
          label: "死亡",
          value: 0,
          color: "#000000	"
        }
      ],
      total: 1,
      death: 0,
      recover: 100
    };
  }
  componentDidMount() {
    axios
      .get(
        "https://r3psfad7i6.execute-api.ap-southeast-1.amazonaws.com/Prod/case"
      )
      .then(data => {
        const latest = data.data.data;

        this._0110 = latest.filter(function(agge) {
          return agge.age <= 10 && agge.age >= 1;
        });

        this._1120 = latest.filter(function(agge) {
          return agge.age <= 20 && agge.age >= 11;
        });

        this._2130 = latest.filter(function(agge) {
          return agge.age <= 30 && agge.age >= 21;
        });
        this._3140 = latest.filter(function(agge) {
          return agge.age <= 40 && agge.age >= 31;
        });
        this._4150 = latest.filter(function(agge) {
          return agge.age <= 50 && agge.age >= 41;
        });
        this._5160 = latest.filter(function(agge) {
          return agge.age <= 60 && agge.age >= 51;
        });
        this._6170 = latest.filter(function(agge) {
          return agge.age <= 70 && agge.age >= 61;
        });
        this._7180 = latest.filter(function(agge) {
          return agge.age <= 80 && agge.age >= 71;
        });
        this._8190 = latest.filter(function(agge) {
          return agge.age <= 90 && agge.age >= 81;
        });
        this._91plus = latest.filter(function(agge) {
          return agge.age >= 90;
        });
        this._0110death = this._0110.filter(
          item => item.status === "死亡"
        ).length;
        console.log(this._0110death);

        this._0110recover = this._0110.filter(
          item => item.status === "出院"
        ).length;
        console.log(this._0110recover);
        this._1120death = this._1120.filter(
          item => item.status === "死亡"
        ).length;
        console.log(this._1120death);
        this._1120recover = this._1120.filter(
          item => item.status === "出院"
        ).length;
        console.log(this._1120recover);
        this._2130death = this._2130.filter(
          item => item.status === "死亡"
        ).length;
        console.log(this._2130death);
        this._2130recover = this._2130.filter(
          item => item.status === "出院"
        ).length;
        console.log(this._2130recover);
        this._3140death = this._3140.filter(
          item => item.status === "死亡"
        ).length;
        console.log(this._3140death);
        this._3140recover = this._3140.filter(
          item => item.status === "出院"
        ).length;
        console.log(this._3140recover);
        this._4150death = this._4150.filter(
          item => item.status === "死亡"
        ).length;
        console.log(this._4150death);
        this._4150recover = this._4150.filter(
          item => item.status === "出院"
        ).length;
        console.log(this._4150recover);
        this._5160death = this._5160.filter(
          item => item.status === "死亡"
        ).length;
        console.log(this._5160death);
        this._5160recover = this._5160.filter(
          item => item.status === "出院"
        ).length;
        console.log(this._5160recover);
        this._6170death = this._6170.filter(
          item => item.status === "死亡"
        ).length;
        console.log(this._6170death);
        this._6170recover = this._6170.filter(
          item => item.status === "出院"
        ).length;
        console.log(this._6170recover);
        this._7180death = this._7180.filter(
          item => item.status === "死亡"
        ).length;
        console.log(this._7180death);
        this._7180recover = this._7180.filter(
          item => item.status === "出院"
        ).length;
        console.log(this._7180recover);
        this._8190death = this._8190.filter(
          item => item.status === "死亡"
        ).length;
        console.log(this._8190death);
        this._8190recover = this._8190.filter(
          item => item.status === "出院"
        ).length;
        console.log(this._8190recover);
        this._91plusdeath = this._91plus.filter(
          item => item.status === "死亡"
        ).length;
        console.log(this._91plusdeath);
        this._91plusrecover = this._91plus.filter(
          item => item.status === "出院"
        ).length;
        console.log(this._91plusrecover);
        this.latestdeath = latest.filter(item => item.status === "死亡").length;
        console.log(this.latestdeath);
        this.latestrecover = latest.filter(
          item => item.status === "出院"
        ).length;
        console.log(this.latestrecover);

        this.setState({
          data: [
            {
              id: "出院",
              label: "出院",
              value: this.latestrecover,
              color: "#4E5A65"
            },
            {
              id: "死亡",
              label: "死亡",
              value: this.latestdeath,
              color: "#000000	"
            }
          ],
          total:
            this.latestdeath + this.latestrecover >= 1
              ? this.latestdeath + this.latestrecover
              : 100,
          death: this.latestdeath,
          recover: this.latestrecover
        });
      });
  }

  latestonClick = () => {
    this.setState({
      data: [
        {
          id: "出院",
          label: "出院",
          value: this.latestrecover,
          color: "#4E5A65"
        },
        {
          id: "死亡",
          label: "死亡",
          value: this.latestdeath,
          color: "#000000	"
        }
      ],
      total:
        this.latestdeath + this.latestrecover >= 1
          ? this.latestdeath + this.latestrecover
          : 7000000,
      death: this.latestdeath,
      recover: this.latestrecover
    });
  };

  _0110onClick = () => {
    this.setState({
      data: [
        {
          id: "出院",
          label: "出院",
          value: this._0110recover,
          color: "#4E5A65"
        },
        {
          id: "死亡",
          label: "死亡",
          value: this._0110death,
          color: "#000000	"
        }
      ],
      total:
        this._0110death + this._0110recover >= 1
          ? this._0110death + this._0110recover
          : 7000000,
      death: this._0110death,
      recover: this._0110recover
    });
  };

  _1120onClick = () => {
    this.setState({
      data: [
        {
          id: "出院",
          label: "出院",
          value: this._1120recover,
          color: "#4E5A65"
        },
        {
          id: "死亡",
          label: "死亡",
          value: this._1120death,
          color: "#000000	"
        }
      ],
      total:
        this._1120death + this._1120recover >= 1
          ? this._1120death + this._1120recover
          : 7000000,
      death: this._1120death,
      recover: this._1120recover
    });
  };
  _2130onClick = () => {
    this.setState({
      data: [
        {
          id: "出院",
          label: "出院",
          value: this._2130recover,
          color: "#4E5A65"
        },
        {
          id: "死亡",
          label: "死亡",
          value: this._2130death,
          color: "#000000	"
        }
      ],
      total:
        this._2130death + this._2130recover >= 1
          ? this._2130death + this._2130recover
          : 7000000,
      death: this._2130death,
      recover: this._2130recover
    });
  };
  _3140onClick = () => {
    this.setState({
      data: [
        {
          id: "出院",
          label: "出院",
          value: this._3140recover,
          color: "#4E5A65"
        },
        {
          id: "死亡",
          label: "死亡",
          value: this._3140death,
          color: "#000000	"
        }
      ],
      total:
        this._3140death + this._3140recover >= 1
          ? this._3140death + this._3140recover
          : 7000000,
      death: this._3140death,
      recover: this._3140recover
    });
  };
  _4150onClick = () => {
    this.setState({
      data: [
        {
          id: "出院",
          label: "出院",
          value: this._4150recover,
          color: "#4E5A65"
        },
        {
          id: "死亡",
          label: "死亡",
          value: this._4150death,
          color: "#000000	"
        }
      ],
      total:
        this._4150death + this._4150recover >= 1
          ? this._4150death + this._4150recover
          : 7000000,
      death: this._4150death,
      recover: this._4150recover
    });
  };
  _5160onClick = () => {
    this.setState({
      data: [
        {
          id: "出院",
          label: "出院",
          value: this._5160recover,
          color: "#4E5A65"
        },
        {
          id: "死亡",
          label: "死亡",
          value: this._5160death,
          color: "#000000	"
        }
      ],
      total:
        this._5160death + this._5160recover >= 1
          ? this._5160death + this._5160recover
          : 7000000,
      death: this._5160death,
      recover: this._5160recover
    });
  };
  _6170onClick = () => {
    this.setState({
      data: [
        {
          id: "出院",
          label: "出院",
          value: this._6170recover,
          color: "#4E5A65"
        },
        {
          id: "死亡",
          label: "死亡",
          value: this._6170death,
          color: "#000000	"
        }
      ],
      total:
        this._6170death + this._6170recover >= 1
          ? this._6170death + this._6170recover
          : 7000000,
      death: this._6170death,
      recover: this._6170recover
    });
  };
  _7180onClick = () => {
    this.setState({
      data: [
        {
          id: "出院",
          label: "出院",
          value: this._7180recover,
          color: "#4E5A65"
        },
        {
          id: "死亡",
          label: "死亡",
          value: this._7180death,
          color: "#000000	"
        }
      ],
      total:
        this._7180death + this._7180recover >= 1
          ? this._7180death + this._7180recover
          : 7000000,
      death: this._7180death,
      recover: this._7180recover
    });
  };
  _8190onClick = () => {
    this.setState({
      data: [
        {
          id: "出院",
          label: "出院",
          value: this._8190recover,
          color: "#4E5A65"
        },
        {
          id: "死亡",
          label: "死亡",
          value: this._8190death,
          color: "#000000	"
        }
      ],
      total:
        this._8190death + this._8190recover >= 1
          ? this._8190death + this._8190recover
          : 7000000,
      death: this._8190death,
      recover: this._8190recover
    });
  };
  _91plusonClick = () => {
    this.setState({
      data: [
        {
          id: "出院",
          label: "出院",
          value: this._91plusrecover,
          color: "#4E5A65"
        },
        {
          id: "死亡",
          label: "死亡",
          value: this._91plusdeath,
          color: "#000000	"
        }
      ],
      total:
        this._91plusdeath + this._91plusrecover >= 1
          ? this._91plusdeath + this._91plusrecover
          : 7000000,
      death: this._91plusdeath,
      recover: this._91plusrecover
    });
  };

  render() {
    return (
      <Paper>
        <h2 style={{ paddingTop: 10, paddingLeft: 10 }}>確診個案死亡率*</h2>
        <div style={{ paddingLeft: 4 }}>
          <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="outlined primary button group"
            size="small"
          >
            <Button onClick={this.latestonClick}>所有年齡</Button>
            <Button onClick={this._0110onClick}>1-10</Button>
            <Button onClick={this._1120onClick}>11-20</Button>
            <Button onClick={this._2130onClick}>21-30</Button>{" "}
            <Button onClick={this._3140onClick}>31-40</Button>{" "}
            <Button onClick={this._4150onClick}>41-50</Button>{" "}
          </ButtonGroup>
          <div style={{ paddingTop: 10 }}>
            <ButtonGroup
              variant="contained"
              color="primary"
              aria-label="outlined primary button group"
              size="small"
            >
              <Button onClick={this._5160onClick}>51-60</Button>{" "}
              <Button onClick={this._6170onClick}>61-70</Button>{" "}
              <Button onClick={this._7180onClick}>71-80</Button>{" "}
              <Button onClick={this._8190onClick}>81-90</Button>{" "}
              <Button onClick={this._91plusonClick}>91+</Button>
            </ButtonGroup>
          </div>
        </div>
        <div style={{ height: "82px" }}>
          <ResponsiveWaffle
            data={this.state.data}
            total={this.state.total}
            rows={4}
            columns={25}
            margin={{ top: 10, right: 0, bottom: 10, left: 0 }}
            colors={{ scheme: "dark2" }}
            borderColor={{ from: "color", modifiers: [["darker", 0.3]] }}
            animate={true}
            motionStiffness={50}
            motionDamping={20}
            legends={[
              {
                anchor: "top-left",
                direction: "column",
                justify: false,
                translateX: -100,
                translateY: 0,
                itemsSpacing: 4,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: "left-to-right",
                itemOpacity: 1,
                itemTextColor: "#777",
                symbolSize: 20,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000",
                      itemBackground: "#f7fafb"
                    }
                  }
                ]
              }
            ]}
          />
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  style={{ backgroundColor: "#009EDE", color: "white" }}
                >
                  已完結個案
                </TableCell>
                <TableCell
                  align="center"
                  style={{ backgroundColor: "#4E5A65", color: "white" }}
                >
                  死亡人數
                </TableCell>
                <TableCell
                  align="center"
                  style={{ backgroundColor: "#178B50", color: "white" }}
                >
                  出院人數
                </TableCell>
                <TableCell
                  align="center"
                  style={{ backgroundColor: "#0C0D0E", color: "white" }}
                >
                  死亡率
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell
                  align="center"
                  style={{
                    backgroundColor: "#E1ECF4",
                    color: "#009EDE",
                    fontSize: 21
                  }}
                >
                  {this.state.total == 7000000 ? 0 : this.state.total}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    backgroundColor: "#F3F6F8",
                    color: "#4E5A65",
                    fontSize: 21
                  }}
                >
                  {this.state.death}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    backgroundColor: "#F1F8F4",
                    color: "#178B50",
                    fontSize: 21
                  }}
                >
                  {this.state.recover}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    backgroundColor: "#F3F6F8",
                    color: "#0C0D0E",
                    fontSize: 21
                  }}
                >
                  {Math.round(
                    (this.state.death /
                      (this.state.death + this.state.recover)) *
                      100
                  ) >= 0
                    ? Math.round(
                        (this.state.death /
                          (this.state.death + this.state.recover)) *
                          100
                      ) + "%"
                    : "-"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  }
}
