import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  all: {
    backgroundColor: "#F5F5F6",
    padding: 40
  },
  root: {
    maxWidth: 345,
    margin: 10
  },
  media: {
    height: 140
  }
});

export default function Source() {
  const classes = useStyles();
  const section = {
    padding: 1,
    backgroundColor: "#F5F5F6"
  };
  return (
    <div class={classes.all}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="https://kubrick.htvapps.com/htv-prod-media.s3.amazonaws.com/images/johns-hopkins-university-1580683593.jpg?crop=1.00xw:1.00xh;0,0&resize=900:*"
            title="約翰·霍普金斯大學"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              約翰·霍普金斯大學<br></br>John Hopkins University
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              約翰·霍普金斯大學提供此網站的中國及國際數據。
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            href="https://www.jhu.edu/"
            target="_blank"
          >
            大學網站
          </Button>
          <Button
            size="small"
            color="primary"
            href="https://github.com/CSSEGISandData/COVID-19"
            target="_blank"
          >
            GitHub
          </Button>
        </CardActions>
      </Card>{" "}
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSZB3RoBqDIlKlmFPoHwI_TVFvOTjZ_KMgbbFvdnG5DpR_0fmvE"
            title="資料一線通"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              資料一線通<br></br>DATA.GOV.HK
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              資料一線通提供此網站的香港數據。香港政府為該等資料的知識產權擁有人，有關資料原屬政府和該網站所有，
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            href="https://www.data.gov.hk "
            target="_blank"
          >
            網站
          </Button>
        </CardActions>
      </Card>
      <div>
        Icons made by{" "}
        <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
          Freepik
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </div>
  );
}
