import React, { Component } from "react";
import HKNewestCaseStatus from "../../components/cards/HKNewestCaseStatus";
import HKSeriousCaseStatus from "../../components/cards/HKSeriousCaseStatus";
import Lastupdate from "../../components/cards/Lastupdate";
import HongKongMaps from "../../components/maps/HongKongMaps";
import DeathWaffle from "../../components/charts/DeathWaffle";
import HKImportOther from "../../components/charts/HKImportOther";

const section = {
  padding: 10
};

const top = {
  paddingTop: 40
};

export default class HKIndepthLeft extends Component {
  render() {
    return (
      <div style={section}>
        <h1>香港地區深入數據分析</h1>
        <hr />

        {/* <HongKongMaps /> */}
        <HKNewestCaseStatus />
        {/* <HKSeriousCaseStatus /> */}
        <HKImportOther />
      </div>
    );
  }
}
