import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

import MaterialTable from "material-table";
import _ from "lodash";
import Typography from "@material-ui/core/Typography";

import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Stepper } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  title: {
    margin: 0,
    display: "flex",
    justifyContent: "center"
  },
  table: {
    minWidth: "100%"
  }
}));

function TablePanel(props) {
  const { title, columns, data, isLoading, index, value } = props;

  return (
    <div hidden={value !== index}>
      <MaterialTable
        title={title}
        columns={columns}
        data={data}
        isLoading={isLoading}
        options={{
          pageSize: 10,
          actionsColumnIndex: -1,
          exportButton: true,
          grouping: false
        }}
      />
    </div>
  );
}

export default props => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [newcountry, setNewCountry] = useState([]);
  const [country, setCountry] = useState([]);
  const [value, setValue] = React.useState(0);
  const [percent, setPercent] = React.useState([]);

  const columnsCountry = [
    { title: "國家", field: "countryconf" },

    {
      title: "累積確診",
      field: "conf",
      defaultSort: "desc"
    },
    {
      title: "累積死亡",
      field: "death"
    }
    // {
    //   title: "累積治愈",
    //   field: "recover"
    // }
  ];

  const columnsnewCountry = [
    { title: "國家", field: "countrynewconf" },

    {
      title: "新增確診",
      field: "newconf",
      defaultSort: "desc"
    },
    {
      title: "新增死亡",
      field: "newdeath"
    },
    // {
    //   title: "新增治愈",
    //   field: "newrecover"
    // },
    {
      title: "確診改變",
      field: "growth",
      sorting: false
    }
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `table-tab-${index}`,
      "aria-controls": `table-tabpanel-${index}`
    };
  }

  useEffect(() => {
    axios
      .all([
        axios.get("https://api.n-cov.info/worldcomfirm"),
        axios.get("https://api.n-cov.info/worlddeath"),
        axios.get("https://api.n-cov.info/worldRecover")
      ])
      .then(
        axios.spread((globalconfD, globaldeathD, globalrecoverD) => {
          let globalconf = Object.values(globalconfD.data.data).pop();
          let globaldeath = Object.values(globaldeathD.data.data).pop();
          let globalrecover = Object.values(globalrecoverD.data.data).pop();

          var finishedconf = Object.entries(
            globalconf
          ).map(([countryconf, conf]) => ({ countryconf, conf }));
          var finisheddeath = Object.entries(
            globaldeath
          ).map(([countrydeath, death]) => ({ countrydeath, death }));
          var finishedrecover = Object.entries(
            globalrecover
          ).map(([countryrecover, recover]) => ({ countryrecover, recover }));

          _.merge(finishedconf, finisheddeath, finishedrecover);

          console.log(finishedconf);
          //increasenum
          let globalconff = Object.values(globalconfD.data.data).pop();
          let globalyestconff = Object.values(globalconfD.data.data)[
            Object.values(globalconfD.data.data).length - 2
          ];
          let globalnewconff = Object.keys(globalconff).reduce((a, k) => {
            a[k] = globalconff[k] - globalyestconff[k];
            return a;
          }, {});
          let globaldeathh = Object.values(globaldeathD.data.data).pop();
          let globalyestdeathh = Object.values(globaldeathD.data.data)[
            Object.values(globaldeathD.data.data).length - 2
          ];

          let globalnewdeathh = Object.keys(globaldeathh).reduce((a, k) => {
            a[k] = globaldeathh[k] - globalyestdeathh[k];
            return a;
          }, {});

          let globalrecoverr = Object.values(globalrecoverD.data.data).pop();
          let globalyestrecoverr = Object.values(globalrecoverD.data.data)[
            Object.values(globalrecoverD.data.data).length - 2
          ];

          let globalnewrecoverr = Object.keys(globalrecoverr).reduce((a, k) => {
            a[k] = globalrecoverr[k] - globalyestrecoverr[k];
            return a;
          }, {});

          var finishednewconf = Object.entries(
            globalnewconff
          ).map(([countrynewconf, newconf]) => ({ countrynewconf, newconf }));

          var finishedyestconf = Object.entries(globalyestconff).map(
            ([countryyestconf, yestconf]) => ({
              countryyestconf,
              yestconf
            })
          );
          var finishednewdeath = Object.entries(globalnewdeathh).map(
            ([countrynewdeath, newdeath]) => ({
              countrynewdeath,
              newdeath
            })
          );
          var finishedyestdeath = Object.entries(globalyestdeathh).map(
            ([countryyestdeath, yestdeath]) => ({
              countryyestdeath,
              yestdeath
            })
          );
          var finishednewrecover = Object.entries(globalnewrecoverr).map(
            ([countrynewrecover, newrecover]) => ({
              countrynewrecover,
              newrecover
            })
          );

          var finishedyestrecover = Object.entries(globalyestrecoverr).map(
            ([countryyestrecover, yestrecover]) => ({
              countryyestrecover,
              yestrecover
            })
          );

          _.merge(finishednewconf, finishednewdeath);
          _.merge(finishedyestconf, finishedyestdeath);
          _.merge(finishedyestconf, finishedconf, finishednewconf);
          console.log(finishednewconf);

          let ress = finishedyestconf.map(x => {
            // copy properties to a new object
            let y = Object.assign({}, x);
            // y["deathrate"] =
            //   ((y["death"] / (y["death"] + y["recover"])) * 100).toFixed(0) <=
            //   100
            //     ? parseInt(
            //         ((y["death"] / (y["death"] + y["recover"])) * 100).toFixed(
            //           0
            //         )
            //       ) + "%"
            //     : parseInt(0) + "%";
            y["growth"] =
              (y["conf"] - y["yestconf"]) / y["yestconf"] > 0
                ? parseFloat(
                    (y["growth"] =
                      ((y["conf"] - y["yestconf"]) / y["yestconf"]) *
                      100).toFixed(2)
                  ) + "%"
                : parseFloat(
                    (y["growth"] =
                      ((y["conf"] - y["yestconf"]) / y["yestconf"]) *
                      100).toFixed(2)
                  ) + "%";
            return y;
          });

          console.log(ress);
          setPercent(ress);
          setCountry(finishedconf);
          setNewCountry(finishednewconf);
          setIsLoading(false);
        })
      );
  }, []);

  return (
    <>
      <Paper square>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="累積" {...a11yProps(0)} />

          <Tab label="新增" {...a11yProps(1)} />
        </Tabs>
      </Paper>

      <TablePanel
        title={""}
        columns={columnsCountry}
        data={percent}
        isLoading={isLoading}
        value={value}
        index={0}
      />
      <TablePanel
        title={""}
        columns={columnsnewCountry}
        data={percent}
        isLoading={isLoading}
        value={value}
        index={1}
      />
    </>
  );
};
