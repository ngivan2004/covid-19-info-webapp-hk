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
    minWidth: 370
  }
});

export default props => {
  const classes = useStyles();
  const [arrival, setarrival] = useState();
  const [departue, setdepartue] = useState();
  const [yesterdayarrival, setyesterdayarrival] = useState();
  const [yesterdaydepartue, setyesterdaydepartue] = useState();

  useEffect(() => {
    axios
      .get(
        "https://r3psfad7i6.execute-api.ap-southeast-1.amazonaws.com/Prod/immigration"
      )
      .then(res => {
        let All = res.data.data.reverse();
        let latestNumber = All.pop().data;
        let yesterdayNumber = All.pop(-2).data;
        setarrival(latestNumber.總計.totalArrival);
        setdepartue(latestNumber.總計.totalDepartue);
        setyesterdayarrival(yesterdayNumber.總計.totalArrival);
        setyesterdaydepartue(yesterdayNumber.總計.totalDepartue);
      });
  }, []);
  return (
    <Paper>
      <h2 style={{ paddingTop: 10, paddingLeft: 10 }}>昨日出入境數據</h2>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell
                align="center"
                style={{ backgroundColor: "#CC1E1E", color: "white" }}
              >
                入境人數
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{ backgroundColor: "#F23A3B", color: "white" }}
              >
                出境人數
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell
                align="center"
                style={{ backgroundColor: "#FDF1F1", color: "#CC1E1E" }}
              >
                {arrival}
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{ backgroundColor: "#FDF1F1", color: "#F23A3B" }}
              >
                {departue}
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell align="center" style={{ color: "#CC1E1E" }}>
                {arrival - yesterdayarrival > 0 ? (
                  <Typography>
                    <ArrowUpward />
                    {arrival - yesterdayarrival}
                  </Typography>
                ) : arrival - yesterdayarrival === 0 ? (
                  <Typography>-</Typography>
                ) : (
                  <Typography>
                    <ArrowDownward /> {arrival - yesterdayarrival}
                  </Typography>
                )}
              </StyledTableCell>
              <StyledTableCell align="center" style={{ color: "#CC1E1E" }}>
                {departue - yesterdaydepartue > 0 ? (
                  <Typography>
                    <ArrowUpward />
                    {departue - yesterdaydepartue}
                  </Typography>
                ) : departue - yesterdaydepartue === 0 ? (
                  <Typography>-</Typography>
                ) : (
                  <Typography>
                    <ArrowDownward /> {departue - yesterdaydepartue}
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
