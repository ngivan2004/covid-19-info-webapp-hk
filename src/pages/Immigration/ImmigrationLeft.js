import React, { Component } from "react";
import ImmigrationNum from "../../components/cards/ImmigrationNum";

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
        <h1>出入境數據</h1>
        <hr />

        <ImmigrationNum />
      </div>
    );
  }
}
