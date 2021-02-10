import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
  load: {
    margin: 100,
    color: theme.palette.primary.light,
  },
}));

export default function Progress() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress className={classes.load} disableShrink />
    </div>
  );
}
