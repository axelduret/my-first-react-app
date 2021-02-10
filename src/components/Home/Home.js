import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const newStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    padding: 20,
    margin: 20,
  },
  h1: {
    textAlign: "center",
    color: theme.palette.warning.light,
  },
  p: {
    textAlign: "left",
    color: theme.palette.grey[400],
  },
}));

export default function Home() {
  const classes = newStyles();
  return (
    <div>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <Typography component={Paper} className={classes.root}>
            <h1 className={classes.h1}>Welcome Home</h1>
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
