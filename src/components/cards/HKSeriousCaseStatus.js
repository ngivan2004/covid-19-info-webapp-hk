import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import axios from "axios";

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
    minWidth: 100
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
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell
              align="center"
              style={{ backgroundColor: "#CA3F81", color: "white" }}
            >
              嚴重病例
            </StyledTableCell>
            <StyledTableCell
              align="center"
              style={{ backgroundColor: "#801749", color: "white" }}
            >
              危殆病例
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell
              align="center"
              style={{ backgroundColor: "#FAF2F6", color: "#CA3F81" }}
            >
              {figure.comfirmCase}
            </StyledTableCell>
            <StyledTableCell
              align="center"
              style={{ backgroundColor: "#FAF2F6", color: "#801749" }}
            >
              {figure.comfirmCase - figure.recover - figure.death}
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
