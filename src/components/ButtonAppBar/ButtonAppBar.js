import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import menuList from "./menuList";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  navbar: {
    background: theme.palette.primary.light,
  },
  menuItem: {
    color: theme.palette.primary.light,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [pageTitle, setTitle] = React.useState("Home");
  const Home = lazy(() => import("../Home/index.js"));
  const Gallery = lazy(() => import("../ImageGridList/Gallery.js"));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickItem = (title) => {
    handleClose();
    setTitle(title);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Router>
      <div className={classes.root}>
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {menuList.map(({ id, title, url }) => (
                <Link
                  key={id}
                  to={url}
                  style={{ textDecoration: "none", display: "block" }}
                  className={classes.menuItem}
                >
                  <MenuItem
                    key={id}
                    onClick={handleClickItem.bind(this, title)}
                  >
                    {title}
                  </MenuItem>
                </Link>
              ))}
            </Menu>

            <Typography variant="h6" className={classes.title}>
              {pageTitle}
            </Typography>
          </Toolbar>
        </AppBar>

        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/gallery" component={Gallery} />
            <Route path="" component={Home} />
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}
