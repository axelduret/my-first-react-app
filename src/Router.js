import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.js";
import Loader from "./components/Loader/Loader.js";
import Error from "./components/Error/Error404.js";
import { makeStyles } from "@material-ui/core/styles";

// main style
const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

export default function MyRouter() {
  // properties
  const classes = useStyles();
  const Home = lazy(() => import("./components/Home/Home.js"));
  const Gallery = lazy(() => import("./components/Gallery/Gallery.js"));
  const Beer = lazy(() => import("./components/Beer/Beer.js"));

  return (
    <div className={classes.root}>
      <Router>
        <Suspense fallback={<Loader />}>
          <NavBar />
          <Switch>
            <Route exact path={"/"} component={Home} />
            <Route exact path={"/image"} component={Gallery} />
            <Route exact path={"/beer"} component={Beer} />
            <Route component={Error} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}
