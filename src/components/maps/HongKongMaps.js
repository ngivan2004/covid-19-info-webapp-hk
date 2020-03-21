import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import HongKong from "@svg-maps/hong-kong";
import { SVGMap } from "react-svg-map";
import "./HongKongMaps.css";
import Paper from "@material-ui/core/Paper";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import axios from "axios";
import _ from "lodash";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  safe: {
    fill: "blue"
  },

  dangerous: {
    fill: "lightblue"
  },
  heat2: {
    fill: "orange"
  },
  heat3: {
    fill: "red"
  }
}));

export default props => {
  let districts = {
    "Kowloon City": "九龍城區",
    "Sha Tin": "沙田",
    Eastern: "東區",
    Southern: "南區",
    "Kwai Tsing": "葵青",
    "Central and Western": "中西區",
    "Yau Tsim Mong": "油尖旺區",
    "Wan Chai": "灣仔",
    "Tuen Mun": "屯門",
    "Wong Tai Sin": "黃大仙",
    North: "北區",
    "Kwun Tong": "觀塘",
    "Sai Kung": "西貢",
    Island: "離島",
    "Sham Shui Po": "深水埗",
    "Tsuen Wan": "荃灣",
    "Yuen Long": "元朗",
    "Tai Po": "大埔"
  };
  let classes = useStyles();
  let [state, setState] = useState();
  let [locationData, setLocationData] = useState({});
  let [location, setPointedLocation] = useState();
  let [tooltipname, settooltipName] = useState();
  let [tooltipvalue, settooltipvalue] = useState();

  useEffect(() => {
    axios
      .get(
        "https://qs1v1ed9pd.execute-api.ap-southeast-1.amazonaws.com/default"
      )
      .then(res => {
        let buildings = res.data.data;
        setLocationData(buildings);
      });
  }, []);

  const handleLocationMouseOver = event => {
    const pointedLocation = getLocationName(event);
    setState({ pointedLocation });
    setPointedLocation(locationData[districts[pointedLocation]]);
    settooltipvalue(location.countBuilding);
  };

  const handleLocationMouseOut = () => {
    setState({ pointedLocation: null, tooltipStyle: { display: "none" } });
  };

  const getLocationClassName = (location, index) => {
    try {
      let dist = districts[location.name];
      let data = locationData[dist];

      if (data !== undefined) {
        if (data.countBuilding > 8) {
          return "dangerous";
        } else if (data.countBuilding > 4) {
          return "middle";
        } else {
          return "safe";
        }
      } else {
        return "none";
      }
    } catch {
      return "safe";
    }
  };

  let getLocationName = event => {
    return event.target.attributes.name.value;
  };

  return (
    <Paper>
      <div>
        <h2>過去 14 天患者曾出現地點</h2>
      </div>
      <SVGMap
        map={HongKong}
        locationClassName={getLocationClassName}
        onLocationMouseOver={handleLocationMouseOver}
        onLocationMouseOut={handleLocationMouseOut}
        locationClassName={getLocationClassName}
      />
      <h3>{tooltipvalue}</h3>
    </Paper>
  );
};
