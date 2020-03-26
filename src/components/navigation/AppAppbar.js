import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ShareIcon from "@material-ui/icons/Share";
import Typography from "@material-ui/core/Typography";

import Drawer from "@material-ui/core/Drawer";
import Sidebar from "./Sidebar";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import Link from "@material-ui/core/Link";

import {
  FacebookShareButton,
  TelegramShareButton,
  WhatsappShareButton
} from "react-share";

import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import FacebookIcon from "@material-ui/icons/Facebook";
import TelegramIcon from "@material-ui/icons/Telegram";

const useStyles = makeStyles(theme => ({
  root: {
    width: "101%",
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center"
  }
}));

export default prop => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    drawer: false
  });

  const toogleDrawer = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ drawer: open });
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toogleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            <Link href="/" color="inherit">
              武漢肺炎資料數據整合
            </Link>
          </Typography>
          <Button
            color="inherit"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <ShareIcon />
          </Button>
        </Toolbar>
      </AppBar>
      <div style={{ paddingTop: 30 }}></div>
      <Drawer open={state.drawer} onClose={toogleDrawer(false)}>
        <Sidebar
          onClick={toogleDrawer(false)}
          onKeyDown={toogleDrawer(false)}
        />
      </Drawer>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <WhatsappShareButton url="https://coronahk.info">
            <WhatsAppIcon /> WhatsApp
          </WhatsappShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <FacebookShareButton url="https://coronahk.info">
            <FacebookIcon />
            Facebook
          </FacebookShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <TelegramShareButton url="https://coronahk.info">
            <TelegramIcon />
            Telegram
          </TelegramShareButton>
        </MenuItem>
      </Menu>
    </div>
  );
};
