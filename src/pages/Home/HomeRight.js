import React from "react";
import "../../App.css";

import LastUpdate from "../../components/cards/Lastupdate";
import GlobalNewestCaseStatus from "../../components/cards/GlobalNewestCaseStatus";
import WorldMap from "../../components/maps/WorldMap";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ImmigrationNum from "../../components/cards/ImmigrationNum";
import IDEEA from "../../IDEEA.png";

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
            查看全球疫情>
          </Button>
        </Paper>
        <Paper>
          <ImmigrationNum />
          <Button href="/immigration" color="primary">
            查看出入境數據>
          </Button>
        </Paper>
        <LastUpdate />
        <img
          style={{
            width: "35%",
            height: "auto",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto"
          }}
          src={IDEEA}
          alt="IDEEA"
        ></img>
        <p
          style={{
            fontSize: 12,
            fontStyle: "bold",
            color: "grey",
            textAlign: "center"
          }}
        >
          Wah Yan College Hong Kong 香港華仁書院
        </p>
        <p
          style={{
            fontSize: 12,
            fontStyle: "bold",
            color: "grey",
            textAlign: "center"
          }}
        >
          2020
        </p>
        <img
          style={{
            width: "12%",
            height: "auto",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto"
          }}
          src="https://upload.wikimedia.org/wikipedia/en/thumb/0/00/Badge_of_Wah_Yan_College%2C_Hong_Kong.svg/1200px-Badge_of_Wah_Yan_College%2C_Hong_Kong.svg.png"
          alt="Wah Yan College Hong Kong 香港華仁書院"
        ></img>
      </div>
    </>
  );
}

export default HomeRight;
