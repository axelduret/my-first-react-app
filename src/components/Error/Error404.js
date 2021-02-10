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
    color: theme.palette.error.light,
  },
  p: {
    textAlign: "center",
    color: theme.palette.error.light,
  },
}));

export default function Error() {
  const classes = newStyles();
  return (
    <div>
      <br />
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <Typography component="div" className={classes.root}>
            <h1 className={classes.h1}>ERROR 404</h1>
            <p className={classes.p}>This page doesn't exist !</p>
          </Typography>
        </Container>
      </React.Fragment>
    </div>
  );
}
