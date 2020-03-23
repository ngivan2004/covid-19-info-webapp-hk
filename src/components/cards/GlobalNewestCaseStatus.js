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
import _ from "lodash";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 21
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 350
  }
});
export default props => {
  const classes = useStyles();
  const [figure, setFigure] = useState({});
  const [yesterday, setYesterday] = useState({});

  useEffect(() => {
    axios
      .all([
        axios.get("https://api.n-cov.info/worldcomfirm"),
        axios.get("https://api.n-cov.info/worlddeath"),
        axios.get("https://api.n-cov.info/worldRecover")
      ])
      .then(
        axios.spread((globalconfD, globaldeathD, globalrecoverD) => {
          Object.prototype.pop = function() {
            for (var key in this) {
              if (!Object.hasOwnProperty.call(this, key)) continue;
              var result = this[key];
              if (!delete this[key]) throw new Error();
              return result;
            }
          };

          const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);
          let globalconf = sumValues(
            Object.values(globalconfD.data.data).pop()
          );
          let globaldeath = sumValues(
            Object.values(globaldeathD.data.data).pop()
          );
          let globalrecover = sumValues(
            Object.values(globalrecoverD.data.data).pop()
          );

          let globalconfy = sumValues(
            Object.values(globalconfD.data.data)[
              Object.values(globalconfD.data.data).length - 2
            ]
          );
          let globaldeathy = sumValues(
            Object.values(globaldeathD.data.data)[
              Object.values(globaldeathD.data.data).length - 2
            ]
          );
          let globalrecovery = sumValues(
            Object.values(globalrecoverD.data.data)[
              Object.values(globalrecoverD.data.data).length - 2
            ]
          );

          var fiigure = {
            comfirmCase: globalconf,
            death: globaldeath,
            recover: globalrecover
          };

          var yeesterday = {
            comfirmCase: globalconfy,
            death: globaldeathy,
            recover: globalrecovery
          };

          console.log(fiigure);
          console.log(yeesterday);

          setFigure(fiigure);
          setYesterday(yeesterday);
        })
      );
  }, []);
  return (
    <Paper>
      <h2>全球最新數字</h2>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell
                align="center"
                style={{
                  backgroundColor: "#CC1E1E",
                  color: "white",
                  fontSize: 17
                }}
              >
                累積確診
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  backgroundColor: "#F23A3B",
                  color: "white",
                  fontSize: 17
                }}
              >
                現有確診
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  backgroundColor: "#178B50",
                  color: "white",
                  fontSize: 15
                }}
              >
                累積出院
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  backgroundColor: "#4E5A65",
                  color: "white",
                  fontSize: 15
                }}
              >
                累積死亡
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  backgroundColor: "#000000",
                  color: "white",
                  fontSize: 13
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
                  fontSize: 14
                }}
              >
                {figure.comfirmCase}
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  backgroundColor: "#FDF1F1",
                  color: "#F23A3B",
                  fontSize: 14
                }}
              >
                {figure.comfirmCase - figure.recover - figure.death}
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  backgroundColor: "#F1F8F4",
                  color: "#178B50",
                  fontSize: 14
                }}
              >
                {figure.recover}
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  backgroundColor: "#F3F6F8",
                  color: "#4E5A65",
                  fontSize: 14
                }}
              >
                {figure.death}
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  backgroundColor: "#F3F6F8",
                  color: "#000000",
                  fontSize: 14
                }}
              >
                {(
                  (figure.death / (figure.death + figure.recover)) *
                  100
                ).toFixed([2])}
                %
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell
                align="center"
                style={{ color: "#CC1E1E", fontSize: 14 }}
              >
                {figure.comfirmCase - yesterday.comfirmCase > 0 ? (
                  <Typography>
                    <ArrowUpward />
                    {figure.comfirmCase - yesterday.comfirmCase}
                  </Typography>
                ) : figure.comfirmCase - yesterday.comfirmCase === 0 ? (
                  <Typography>-</Typography>
                ) : (
                  <Typography>
                    <ArrowDownward />{" "}
                    {figure.comfirmCase - yesterday.comfirmCase}
                  </Typography>
                )}
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{ color: "#F23A3B", fontSize: 14 }}
              >
                {figure.comfirmCase -
                  figure.recover -
                  figure.death -
                  (yesterday.comfirmCase -
                    yesterday.recover -
                    yesterday.death) >
                0 ? (
                  <Typography>
                    <ArrowUpward />
                    {figure.comfirmCase -
                      figure.recover -
                      figure.death -
                      (yesterday.comfirmCase -
                        yesterday.recover -
                        yesterday.death)}
                  </Typography>
                ) : figure.comfirmCase -
                    figure.recover -
                    figure.death -
                    (yesterday.comfirmCase -
                      yesterday.recover -
                      yesterday.death) ===
                  0 ? (
                  <Typography>-</Typography>
                ) : (
                  <Typography>
                    <ArrowDownward />{" "}
                    {figure.comfirmCase -
                      figure.recover -
                      figure.death -
                      (yesterday.comfirmCase -
                        yesterday.recover -
                        yesterday.death)}
                  </Typography>
                )}
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{ color: "#178B50", fontSize: 14 }}
              >
                {figure.recover - yesterday.recover > 0 ? (
                  <Typography>
                    <ArrowUpward />
                    {figure.recover - yesterday.recover}
                  </Typography>
                ) : figure.recover - yesterday.recover === 0 ? (
                  <Typography>-</Typography>
                ) : (
                  <Typography>
                    <ArrowDownward /> {figure.recover - yesterday.recover}
                  </Typography>
                )}
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{ color: "#4E5A65", fontSize: 14 }}
              >
                {figure.death - yesterday.death > 0 ? (
                  <Typography>
                    <ArrowUpward />
                    {figure.death - yesterday.death}
                  </Typography>
                ) : figure.death - yesterday.death === 0 ? (
                  <Typography>-</Typography>
                ) : (
                  <Typography>
                    <ArrowDownward /> {figure.death - yesterday.death}
                  </Typography>
                )}
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{ color: "#4E5A65", fontSize: 14 }}
              >
                {(figure.death / (figure.death + figure.recover)) * 100 -
                  (yesterday.death / (yesterday.death + yesterday.recover)) *
                    100 >
                0 ? (
                  <Typography>
                    <ArrowUpward />
                    {(
                      (figure.death / (figure.death + figure.recover)) * 100 -
                      (yesterday.death /
                        (yesterday.death + yesterday.recover)) *
                        100
                    ).toFixed([2])}
                    %
                  </Typography>
                ) : (figure.death / (figure.death + figure.recover)) * 100 -
                    (yesterday.death / (yesterday.death + yesterday.recover)) *
                      100 ===
                  0 ? (
                  <Typography>-</Typography>
                ) : (
                  <Typography>
                    <ArrowDownward />{" "}
                    {(
                      (figure.death / (figure.death + figure.recover)) * 100 -
                      (yesterday.death /
                        (yesterday.death + yesterday.recover)) *
                        100
                    ).toFixed([2])}
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
