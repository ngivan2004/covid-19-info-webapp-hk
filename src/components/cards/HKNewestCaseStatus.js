import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import axios from "axios";
import Typography from "@material-ui/core/Typography";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 21,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 350,
  },
});
export default (props) => {
  const classes = useStyles();
  const [figure, setFigure] = useState({});
  const [yesterday, setYesterday] = useState({});

  useEffect(() => {
    axios
      .get(
        "https://api.data.gov.hk/v2/filter?q=%7B%22resource%22%3A%22http%3A%2F%2Fwww.chp.gov.hk%2Ffiles%2Fmisc%2Flatest_situation_of_reported_cases_covid_19_eng.csv%22%2C%22section%22%3A1%2C%22format%22%3A%22json%22%7D"
      )
      .then((res) => {
        let latestNumber = res.data.pop();
        let yesterdayNumber = res.data.pop(-2);
        setFigure(latestNumber);
        setYesterday(yesterdayNumber);
      });
  }, []);
  return (
    <Paper>
      <h2 style={{ paddingTop: 10, paddingLeft: 10 }}>香港最新數字</h2>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell
                align="center"
                style={{
                  backgroundColor: "#CC1E1E",
                  color: "white",
                  fontSize: 11,
                }}
              >
                累積確診
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  backgroundColor: "#F23A3B",
                  color: "white",
                  fontSize: 11,
                }}
              >
                現有確診
              </StyledTableCell>
              <StyledTableCell
              align="center"
              style={{ backgroundColor: "#801749", color: "white" }}
            >
              危殆病例
            </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  backgroundColor: "#148B50",
                  color: "white",
                  fontSize: 13,
                }}
              >
                出院
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  backgroundColor: "#4E5A65",
                  color: "white",
                  fontSize: 13,
                }}
              >
                死亡
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  backgroundColor: "#000000",
                  color: "white",
                  fontSize: 12,
                }}
              >
                死亡率
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell
                align="center"
                style={{
                  backgroundColor: "#FDF1F1",
                  color: "#CC1E1E",
                  fontSize: 16,
                }}
              >
                {figure["Number of confirmed cases"]}
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  backgroundColor: "#FDF1F1",
                  color: "#F23A3B",
                  fontSize: 16,
                }}
              >
                {figure["Number of confirmed cases"] - figure["Number of discharge cases"] - figure["Number of death cases"]}
              </StyledTableCell>
              <StyledTableCell
              align="center"
              style={{ backgroundColor: "#FAF2F6", color: "#801749",fontSize:16 }}
            >
              {figure["Number of hospitalised cases in critical condition"]}
            </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  backgroundColor: "#F1F8F4",
                  color: "#148B50",
                  fontSize: 16,
                }}
              >
                {figure["Number of discharge cases"]}
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  backgroundColor: "#F3F6F8",
                  color: "#4E5A65",
                  fontSize: 16,
                }}
              >
                {figure["Number of death cases"]}
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  backgroundColor: "#F3F6F8",
                  color: "#4E5A65",
                  fontSize: 16,
                }}
              >
                {(
                  (figure["Number of death cases"] / (figure["Number of death cases"] + figure["Number of discharge cases"])) *
                  100
                ).toFixed(1)}
                %
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell
                align="center"
                style={{ color: "#CC1E1E", fontSize: 12 }}
              >
                {figure["Number of confirmed cases"] - yesterday["Number of confirmed cases"] > 0 ? (
                  <Typography style={{ fontSize: 12 }}>
                    <ArrowUpward />
                    {figure["Number of confirmed cases"] - yesterday["Number of confirmed cases"]}
                  </Typography>
                ) : figure["Number of confirmed cases"] - yesterday["Number of confirmed cases"] === 0 ? (
                  <Typography>-</Typography>
                ) : (
                  <Typography style={{ fontSize: 12 }}>
                    <ArrowDownward />{" "}
                    {figure["Number of confirmed cases"] - yesterday["Number of confirmed cases"]}
                  </Typography>
                )}
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{ color: "#F23A3B", fontSize: 12 }}
              >
                {figure["Number of confirmed cases"] -
                  figure["Number of discharge cases"] -
                  figure["Number of death cases"] -
                  (yesterday["Number of confirmed cases"] -
                    yesterday["Number of discharge cases"] -
                    yesterday["Number of death cases"]) >
                0 ? (
                  <Typography style={{ fontSize: 12 }}>
                    <ArrowUpward />
                    {figure["Number of confirmed cases"] -
                      figure["Number of discharge cases"] -
                      figure["Number of death cases"] -
                      (yesterday["Number of confirmed cases"] -
                        yesterday["Number of discharge cases"] -
                        yesterday["Number of death cases"])}
                  </Typography>
                ) : figure["Number of confirmed cases"] -
                    figure["Number of discharge cases"] -
                    figure["Number of death cases"] -
                    (yesterday["Number of confirmed cases"] -
                      yesterday["Number of discharge cases"] -
                      yesterday["Number of death cases"]) ===
                  0 ? (
                  <Typography>-</Typography>
                ) : (
                  <Typography style={{ fontSize: 12 }}>
                    <ArrowDownward />{" "}
                    {figure["Number of confirmed cases"] -
                      figure["Number of discharge cases"] -
                      figure["Number of death cases"] -
                      (yesterday["Number of confirmed cases"] -
                        yesterday["Number of discharge cases"] -
                        yesterday["Number of death cases"])}
                  </Typography>
                )}
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{ color: "#801749", fontSize: 12 }}
              >
                {figure["Number of hospitalised cases in critical condition"] - yesterday["Number of hospitalised cases in critical condition"] > 0 ? (
                  <Typography style={{ fontSize: 12 }}>
                    <ArrowUpward />
                    {figure["Number of hospitalised cases in critical condition"] - yesterday["Number of hospitalised cases in critical condition"]}
                  </Typography>
                ) : figure["Number of hospitalised cases in critical condition"] - yesterday["Number of hospitalised cases in critical condition"] === 0 ? (
                  <Typography>-</Typography>
                ) : (
                  <Typography style={{ fontSize: 12 }}>
                    <ArrowDownward /> {figure["Number of hospitalised cases in critical condition"] - yesterday["Number of hospitalised cases in critical condition"]}
                  </Typography>
                )}
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{ color: "#148B50", fontSize: 12 }}
              >
                {figure["Number of discharge cases"] - yesterday["Number of discharge cases"] > 0 ? (
                  <Typography style={{ fontSize: 12 }}>
                    <ArrowUpward />
                    {figure["Number of discharge cases"] - yesterday["Number of discharge cases"]}
                  </Typography>
                ) : figure["Number of discharge cases"] - yesterday["Number of discharge cases"] === 0 ? (
                  <Typography>-</Typography>
                ) : (
                  <Typography style={{ fontSize: 12 }}>
                    <ArrowDownward /> {figure["Number of discharge cases"] - yesterday["Number of discharge cases"]}
                  </Typography>
                )}
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{ color: "#4E5A65", fontSize: 12 }}
              >
                {figure["Number of death cases"] - yesterday["Number of death cases"] > 0 ? (
                  <Typography style={{ fontSize: 12 }}>
                    <ArrowUpward />
                    {figure["Number of death cases"] - yesterday["Number of death cases"]}
                  </Typography>
                ) : figure["Number of death cases"] - yesterday["Number of death cases"] === 0 ? (
                  <Typography>-</Typography>
                ) : (
                  <Typography style={{ fontSize: 12 }}>
                    <ArrowDownward /> {figure["Number of death cases"] - yesterday["Number of death cases"]}
                  </Typography>
                )}
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{ color: "#4E5A65", fontSize: 16 }}
              >
                {figure["Number of death cases"] / (figure["Number of death cases"] + figure["Number of discharge cases"]) -
                  yesterday["Number of death cases"] / (yesterday["Number of death cases"] + yesterday["Number of discharge cases"]) >
                0 ? (
                  <Typography style={{ fontSize: 12 }}>
                    <ArrowUpward />
                    {(
                      (figure["Number of death cases"] / (figure["Number of death cases"] + figure["Number of discharge cases"]) -
                        yesterday["Number of death cases"] /
                          (yesterday["Number of death cases"] + yesterday["Number of discharge cases"])) *
                      100
                    ).toFixed(1)}
                    %
                  </Typography>
                ) : figure["Number of death cases"] / (figure["Number of death cases"] + figure["Number of discharge cases"]) -
                    yesterday["Number of death cases"] / (yesterday["Number of death cases"] + yesterday["Number of discharge cases"]) ===
                  0 ? (
                  <Typography>-</Typography>
                ) : (
                  <Typography style={{ fontSize: 9 }}>
                    <ArrowDownward />{" "}
                    {(
                      (figure["Number of death cases"] / (figure["Number of death cases"] + figure["Number of discharge cases"]) -
                        yesterday["Number of death cases"] /
                          (yesterday["Number of death cases"] + yesterday["Number of discharge cases"])) *
                      100
                    ).toFixed(1)}
                    %
                  </Typography>
                )}
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
