import React from "react";
import "../../App.css";
import GlobalInfo from "../../components/tables/GlobalInfo";
import LastUpdate from "../../components/cards/Lastupdate";

const section = {
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: 35
};

const top = {
  paddingTop: 0
};

function GlobalRight() {
  return (
    <>
      <div style={section}>
        <GlobalInfo />
        <LastUpdate />
      </div>
    </>
  );
}

export default GlobalRight;
