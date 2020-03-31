import React from "react";
import "../../App.css";
import GlobalInfo from "../../components/tables/GlobalInfo";
import LastUpdate from "../../components/cards/Lastupdate";
import IDEEA from "../../IDEEA.png";

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

export default GlobalRight;
