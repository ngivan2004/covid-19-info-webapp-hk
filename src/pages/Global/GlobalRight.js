import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

import MaterialTable from "material-table";
import _ from "lodash";
import Typography from "@material-ui/core/Typography";

import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  title: {
    margin: 30,
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

  const [country, setCountry] = useState([]);

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
    },
    {
      title: "累積治愈",
      field: "recover"
    }
  ];

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

          setCountry(finishedconf);
          setIsLoading(false);
        })
      );
  }, []);

  return (
    <div style={{ padding: 5 }}>
      <Paper>
        <TablePanel
          title={""}
          columns={columnsCountry}
          data={country}
          isLoading={isLoading}
        />
      </Paper>
    </div>
  );
};
