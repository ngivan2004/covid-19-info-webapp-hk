import React from "react";
import "../../App.css";

import LastUpdate from "../../components/cards/Lastupdate";
import GlobalNewestCaseStatus from "../../components/cards/GlobalNewestCaseStatus";
import WorldMap from "../../components/maps/WorldMap";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ImmigrationNum from "../../components/cards/ImmigrationNum";

const section = {
  padding: 10
};

function HomeRight() {
  return (
    <>
      <div style={section}>
        <Paper>
          <GlobalNewestCaseStatus />
          <WorldMap />
          <Button href="/global" color="primary">
            查看全球疫情>>
          </Button>
        </Paper>
        <Paper>
          <ImmigrationNum />
          <Button href="/immigration" color="primary">
            查看出入境數據>>
          </Button>
        </Paper>
        <LastUpdate />
      </div>
    </>
  );
}

export default HomeRight;
