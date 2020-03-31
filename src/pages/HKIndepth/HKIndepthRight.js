import React, { Component } from "react";
import HKNewestCaseStatus from "../../components/cards/HKNewestCaseStatus";
import HKSeriousCaseStatus from "../../components/cards/HKSeriousCaseStatus";
import Lastupdate from "../../components/cards/Lastupdate";
import HongKongMaps from "../../components/maps/HongKongMaps";
import DeathWaffle from "../../components/charts/DeathWaffle";
import AgeStatus from "../../components/charts/AgeStatus";
import IDEEA from "../../IDEEA.png";

const section = {
  padding: 10
};

export default class HKIndepthRight extends Component {
  render() {
    return (
      <div style={section}>
        <DeathWaffle />
        <AgeStatus />
        <Lastupdate />
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
    );
  }
}
