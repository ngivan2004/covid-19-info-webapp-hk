import React, { useEffect, useState } from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";

export default function Lastupdate() {
  const [updateDate, setUpdateDate] = useState([]);
  useEffect(() => {
    axios
      .all([
        axios.get("https://api.n-cov.info/figure"),
        axios.get("https://api.n-cov.info/worldcomfirm")
      ])
      .then(
        axios.spread((hklatestD, globalconfD) => {
          const hklatest = hklatestD.data.data;
          const globalconfirmlateset = globalconfD.data.data;

          const hkupdated = hklatest.pop().updateDate;
          const hkupdatet = hklatest.pop().updateTime;
          const globalupdated = Object.keys(globalconfirmlateset).pop();
          setUpdateDate({
            HKUpdateDate: hkupdated,
            HKUpdateTime: hkupdatet,
            HKUpdateFull: `${hkupdated} ${hkupdatet}`,
            GlobalUpdateDate: globalupdated
          });
        })
      );
  }, []);
  return (
    <Paper>
      <p style={({ lineHeight: "-1" }, { color: "grey" })}>
        數據每約24小時更新一次
      </p>
      <p style={({ lineHeight: "-1" }, { color: "grey" })}>
        香港數據統計截至 {updateDate.HKUpdateFull}
      </p>
      <p style={({ lineHeight: "-1" }, { color: "grey" })}>
        中國及國際數據統計截至 {updateDate.GlobalUpdateDate}
      </p>
    </Paper>
  );
}
