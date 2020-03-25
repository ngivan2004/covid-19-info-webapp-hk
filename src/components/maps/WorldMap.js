import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import ButtonGroup from "@material-ui/core/ButtonGroup";
export default props => {
  const [show, setShow] = useState();
  const [confirm, setconfirm] = useState();
  const [death, setdeath] = useState();
  const [colors, setColors] = useState();
  const [region, setRegion] = useState();
  let confirmarray;
  let deatharray;
  useEffect(() => {
    axios
      .all([
        axios.get("https://api.n-cov.info/worldcomfirm"),
        axios.get("https://api.n-cov.info/worlddeath")
        // axios.get("https://api.n-cov.info/worldRecover")
      ])
      .then(
        axios.spread((globalconfD, globaldeathD) => {
          var confirmobj = globalconfD.data.data;
          var confirmobjtoday =
            confirmobj[
              Object.keys(confirmobj)[Object.keys(confirmobj).length - 1]
            ];

          var deathobj = globaldeathD.data.data;
          var deathobjtoday =
            deathobj[Object.keys(deathobj)[Object.keys(deathobj).length - 1]];
          confirmarray = Object.entries(confirmobjtoday);
          //Object.keys(confirmobjtoday).map(function(key) {
          //     return [Number(key), confirmobjtoday[key]];
          //   });
          deatharray = Object.entries(deathobjtoday);
          confirmarray.unshift(["Country", "Confirmed Cases"]);
          deatharray.unshift(["Country", "Deaths"]);

          setShow(confirmarray);
          setconfirm(confirmarray);
          setdeath(deatharray);
          setRegion("world");
          setColors([
            "#ffe6e6",

            "#ff6666",
            "#ff4d4d",
            "#ff3333",
            "#ff1a1a",
            "#ff0000",
            "#e60000",
            "#cc0000",
            "#b30000",
            "#990000",
            "#800000",
            "#660000",
            "#4d0000",
            "#330000",
            "#330000",
            "#330000",
            "#330000",
            "#330000",
            "#330000",
            "#330000",
            "#330000",
            "#330000",
            "#330000",
            "#330000",
            "#330000",
            "#330000",
            "#330000",
            "#330000",
            "#330000",
            "#330000",
            "#330000"
          ]);
        })
      );
  }, []);

  const confirmm = () => {
    setShow(confirm);
    setColors([
      "#ffe6e6",

      "#ff6666",
      "#ff4d4d",
      "#ff3333",
      "#ff1a1a",
      "#ff0000",
      "#e60000",
      "#cc0000",
      "#b30000",
      "#990000",
      "#800000",
      "#660000",
      "#4d0000",
      "#330000",
      "#330000",
      "#330000",
      "#330000",
      "#330000",
      "#330000",
      "#330000",
      "#330000",
      "#330000",
      "#330000",
      "#330000",
      "#330000",
      "#330000",
      "#330000",
      "#330000",
      "#330000",
      "#330000",
      "#330000"
    ]);
  };
  const deathh = () => {
    setShow(death);
    setColors(["#ffe6ff", "#1a001a"]);
  };

  const wrld = () => {
    setRegion("world");
  };
  const eu = () => {
    setRegion("150");
  };
  return (
    <Paper>
      <div>
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="outlined primary button group"
        >
          <Button onClick={confirmm}>確診</Button>
          <Button onClick={deathh}>死亡</Button>
        </ButtonGroup>
        <h6></h6>
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="outlined primary button group"
        >
          <Button onClick={wrld}>全球</Button>
          <Button onClick={eu}>歐洲</Button>
        </ButtonGroup>
      </div>
      <Chart
        chartType="GeoChart"
        data={show}
        options={{
          region: region,
          colorAxis: {
            colors: colors
          }
        }}
        // Note: you will need to get a mapsApiKey for your project.
        // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
        //mapsApiKey=""
      />
    </Paper>
  );
};
