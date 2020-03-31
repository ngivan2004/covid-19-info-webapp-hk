import React from "react";
import "../../App.css";
import IDEEA from "../../IDEEA.png";
const section = {
  padding: 10
};

function ImmigrationLeft() {
  return (
    <>
      <div style={section}>
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

export default ImmigrationLeft;
