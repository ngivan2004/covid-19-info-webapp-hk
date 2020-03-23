import React, { Component } from "react";
import HKNewestCaseStatus from "../../components/cards/HKNewestCaseStatus";
import HKSeriousCaseStatus from "../../components/cards/HKSeriousCaseStatus";
import Lastupdate from "../../components/cards/Lastupdate";
import HongKongMaps from "../../components/maps/HongKongMaps";
import DeathWaffle from "../../components/charts/DeathWaffle";
import AgeStatus from "../../components/charts/AgeStatus";

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
      </div>
    );
  }
}
