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
          const renameKeys = (keysMap, obj) =>
            Object.keys(obj).reduce(
              (acc, key) => ({
                ...acc,
                ...{ [keysMap[key] || key]: obj[key] }
              }),
              {}
            );

          var countrywithissues = {
            "Congo (Brazzaville)": "CG",
            "Congo (Kinshasa)": "CD",
            "Cote d'Ivoire": "CI",
            Czechia: "CZ",
            "Diamond Princess": "",
            Eswatini: "SZ",
            "Taiwan*": "Taiwan",
            "Cabo Verde": "CV",
            "Holy See": "VA",
            "Korea, South": "South Korea",
            "North Macedonia": "MK",
            "Timor-Leste": "TL"
          };

          var confirmobj = globalconfD.data.data;
          var confirmobjtoday =
            confirmobj[
              Object.keys(confirmobj)[Object.keys(confirmobj).length - 1]
            ];

          var fixedconfirmobjtoday = renameKeys(
            countrywithissues,
            confirmobjtoday
          );

          var deathobj = globaldeathD.data.data;
          var deathobjtoday =
            deathobj[Object.keys(deathobj)[Object.keys(deathobj).length - 1]];

          var fixeddeathobjtoday = renameKeys(countrywithissues, deathobjtoday);
          delete fixedconfirmobjtoday["Diamond Princess"];
          delete fixedconfirmobjtoday["West Bank and Gaza"];
          delete fixeddeathobjtoday["Diamond Princess"];
          delete fixeddeathobjtoday["West Bank and Gaza"];
          confirmarray = Object.entries(fixedconfirmobjtoday);
          deatharray = Object.entries(fixeddeathobjtoday);
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
  const as = () => {
    setRegion("142");
  };
  return (
    <Paper>
      <div style={{ paddingTop: 10, paddingLeft: 10 }}>
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="outlined primary button group"
        >
          <Button onClick={confirmm}>確診</Button>
          <Button onClick={deathh}>死亡</Button>
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
      <div style={{ padding: 10 }}>
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="outlined primary button group"
        >
          <Button onClick={wrld}>全球</Button>
          <Button onClick={eu}>歐洲</Button>
          <Button onClick={as}>亞洲</Button>
        </ButtonGroup>
      </div>
    </Paper>
  );
};
