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
      .get(
        "https://r3psfad7i6.execute-api.ap-southeast-1.amazonaws.com/Prod/figure"
      )
      .then(res => {
        let latestNumber = res.data.data.pop();
        let yesterdayNumber = res.data.data.pop(-2);
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
                  fontSize: 11
                }}
              >
                累積確診
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  backgroundColor: "#F23A3B",
                  color: "white",
                  fontSize: 11
                }}
              >
                現有確診
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  backgroundColor: "#148B50",
                  color: "white",
                  fontSize: 13
                }}
              >
                出院
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  backgroundColor: "#4E5A65",
                  color: "white",
                  fontSize: 13
                }}
              >
                死亡
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  backgroundColor: "#000000",
                  color: "white",
                  fontSize: 12
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
                  fontSize: 16
                }}
              >
                {figure.comfirmCase}
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  backgroundColor: "#FDF1F1",
                  color: "#F23A3B",
                  fontSize: 16
                }}
              >
                {figure.comfirmCase - figure.recover - figure.death}
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  backgroundColor: "#F1F8F4",
                  color: "#148B50",
                  fontSize: 16
                }}
              >
                {figure.recover}
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  backgroundColor: "#F3F6F8",
                  color: "#4E5A65",
                  fontSize: 16
                }}
              >
                {figure.death}
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  backgroundColor: "#F3F6F8",
                  color: "#4E5A65",
                  fontSize: 16
                }}
              >
                {(
                  (figure.death / (figure.death + figure.recover)) *
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
                {figure.comfirmCase - yesterday.comfirmCase > 0 ? (
                  <Typography style={{ fontSize: 12 }}>
                    <ArrowUpward />
                    {figure.comfirmCase - yesterday.comfirmCase}
                  </Typography>
                ) : figure.comfirmCase - yesterday.comfirmCase === 0 ? (
                  <Typography>-</Typography>
                ) : (
                  <Typography style={{ fontSize: 12 }}>
                    <ArrowDownward />{" "}
                    {figure.comfirmCase - yesterday.comfirmCase}
                  </Typography>
                )}
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{ color: "#F23A3B", fontSize: 12 }}
              >
                {figure.comfirmCase -
                  figure.recover -
                  figure.death -
                  (yesterday.comfirmCase -
                    yesterday.recover -
                    yesterday.death) >
                0 ? (
                  <Typography style={{ fontSize: 12 }}>
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
                  <Typography style={{ fontSize: 12 }}>
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
                style={{ color: "#148B50", fontSize: 12 }}
              >
                {figure.recover - yesterday.recover > 0 ? (
                  <Typography style={{ fontSize: 12 }}>
                    <ArrowUpward />
                    {figure.recover - yesterday.recover}
                  </Typography>
                ) : figure.recover - yesterday.recover === 0 ? (
                  <Typography>-</Typography>
                ) : (
                  <Typography style={{ fontSize: 12 }}>
                    <ArrowDownward /> {figure.recover - yesterday.recover}
                  </Typography>
                )}
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{ color: "#4E5A65", fontSize: 12 }}
              >
                {figure.death - yesterday.death > 0 ? (
                  <Typography style={{ fontSize: 12 }}>
                    <ArrowUpward />
                    {figure.death - yesterday.death}
                  </Typography>
                ) : figure.death - yesterday.death === 0 ? (
                  <Typography>-</Typography>
                ) : (
                  <Typography style={{ fontSize: 12 }}>
                    <ArrowDownward /> {figure.death - yesterday.death}
                  </Typography>
                )}
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{ color: "#4E5A65", fontSize: 16 }}
              >
                {figure.death / (figure.death + figure.recover) -
                  yesterday.death / (yesterday.death + yesterday.recover) >
                0 ? (
                  <Typography style={{ fontSize: 12 }}>
                    <ArrowUpward />
                    {(
                      (figure.death / (figure.death + figure.recover) -
                        yesterday.death /
                          (yesterday.death + yesterday.recover)) *
                      100
                    ).toFixed(1)}
                    %
                  </Typography>
                ) : figure.death / (figure.death + figure.recover) -
                    yesterday.death / (yesterday.death + yesterday.recover) ===
                  0 ? (
                  <Typography>-</Typography>
                ) : (
                  <Typography style={{ fontSize: 9 }}>
                    <ArrowDownward />{" "}
                    {(
                      (figure.death / (figure.death + figure.recover) -
                        yesterday.death /
                          (yesterday.death + yesterday.recover)) *
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
