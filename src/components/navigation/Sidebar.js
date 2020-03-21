import React from "react";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";

import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import MailIcon from "@material-ui/icons/Mail";
import TimelineIcon from "@material-ui/icons/Timeline";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import CollectionsIcon from "@material-ui/icons/Collections";
import ApartmentIcon from "@material-ui/icons/Apartment";
import StorageIcon from "@material-ui/icons/Storage";
import ContactsIcon from "@material-ui/icons/Contacts";
import HotelIcon from "@material-ui/icons/Hotel";
import PublicIcon from "@material-ui/icons/Public";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});

export default prop => {
  const classes = useStyles();
  return (
    <div
      className={classes.list}
      id="list"
      role="presentation"
      onClick={prop.onClick}
      onKeyDown={prop.onKeyDown}
    >
      <List>
        <ListItem button key="主頁" component="a" href="/">
          <ListItemIcon>
            <HomeIcon color="error" />
          </ListItemIcon>
          <ListItemText primary="主頁" />
        </ListItem>
        <ListItem
          button
          key="香港地區深入數據分析"
          component="a"
          href="/hkindepth"
        >
          <ListItemIcon>
            <TimelineIcon color="error" />
          </ListItemIcon>
          <ListItemText primary="香港地區深入數據分析" />
        </ListItem>
        {/* <ListItem button key="全球疫情" component="a" href="/globalstat">
          <ListItemIcon>
            <PublicIcon color="error" />
          </ListItemIcon>
          <ListItemText primary="全球疫情" />
        </ListItem> */}
        {/* <ListItem button key="個案" component="a" href="/cases">
          <ListItemIcon>
            <HotelIcon color="error" />
          </ListItemIcon>
          <ListItemText primary="個案" />
        </ListItem>
        <ListItem button key="高危地區" component="a" href="/hrisk">
          <ListItemIcon>
            <ApartmentIcon color="error" />
          </ListItemIcon>
          <ListItemText primary="高危地區" />
        </ListItem> */}
      </List>
      <Divider />
      <List>
        {/* <ListItem button key="關於我" component="a" href="/aboutme">
          <ListItemIcon>
            <InfoIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="關於我" />
        </ListItem>
        <ListItem button key="你的意見" component="a" href="/contactme">
          <ListItemIcon>
            <MailIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="你的意見" />
        </ListItem> */}
        <ListItem button key="資料來源" component="a" href="/source">
          <ListItemIcon>
            <StorageIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="資料來源" />
        </ListItem>
      </List>
    </div>
  );
};
