import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const newStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
  },
  h1: {
    textAlign: "center",
    color: theme.palette.grey[600],
  },
  p: {
    textAlign: "left",
    color: theme.palette.grey[400],
  },
}));

function index() {
  const classes = newStyles();
  return (
    <div>
      <br />
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <Typography component="div" className={classes.root}>
            <h1 className={classes.h1}>WELCOME HOME</h1>
            <p className={classes.p}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
              eos quaerat nostrum, quisquam itaque sint ipsum iusto, magni animi
              fugit earum impedit ea assumenda mollitia reprehenderit
              laboriosam. Quia, aliquam molestiae?
            </p>
          </Typography>
        </Container>
      </React.Fragment>
    </div>
  );
}
export default index;
