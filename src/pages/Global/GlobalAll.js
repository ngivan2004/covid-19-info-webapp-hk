import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import GlobalLeft from "./GlobalLeft";
import GlobalRight from "./GlobalRight";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  homeWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap"
  },
  leftWrapper: {
    flex: 1,
    padding: 6
  },
  rightWrapper: {
    flex: 1,
    padding: 6
  },
  cardBottom: {
    display: "flex",
    justifyContent: "flex-end"
  },
  card: {
    marginTop: 15
  },
  cardTitle: {
    backgroudColor: "#333333"
  }
}));

export default props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.homeWrapper}>
        <div className={classes.leftWrapper}>
          <GlobalLeft />
        </div>
        <div className={classes.rightWrapper}>
          <GlobalRight />
        </div>
      </div>
    </div>
  );
};
