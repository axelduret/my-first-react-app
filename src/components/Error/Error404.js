import React from "react";
import { Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

// error page style
const newStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    padding: 20,
    margin: 20,
    paddingTop: 4,
    paddingBottom: 16,
  },
  h1: {
    textAlign: "center",
    color: theme.palette.common.white,
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },
  p: {
    textAlign: "center",
    color: theme.palette.grey[400],
  },
  link: {
    color: theme.palette.secondary.light,
  },
}));

export default function Error() {
  //properties
  const classes = newStyles();
  return (
    <div>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <Typography component={Paper} className={classes.root}>
            <h1 className={classes.h1}>Page Not Found</h1>
            <p className={classes.p}>This page doesn't exist !</p>
            <p className={classes.p}>
              <Link
                to=""
                className={classes.link}
                style={{ textDecoration: "none", display: "block" }}
              >
                Back to homepage
              </Link>
            </p>
          </Typography>
        </Container>
      </React.Fragment>
    </div>
  );
}
