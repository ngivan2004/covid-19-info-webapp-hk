import React from "react";
import "../../App.css";
import GlobalInfo from "../../components/tables/GlobalInfo";

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
      </div>
    </>
  );
}

export default GlobalRight;
