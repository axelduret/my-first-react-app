import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import MenuList from "./MenuList";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

// navbar style
const useStyles = makeStyles((theme) => ({
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
    textAlign: "left",
    marginRight: theme.spacing(2),
    flexGrow: 1,
  },
}));

export default function NavBar() {
  // properties
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const [pageTitle, setTitle] = useState(() => {
    if (window.location.pathname === "/image") {
      return "Portfolio";
    } else if (window.location.pathname === "/beer") {
      return "Punk API";
    } else {
      return "My React App";
    }
  });

  // set document title
  function PageTitle() {
    if (window.location.pathname === "/image") {
      document.title = "Portfolio";
    } else if (window.location.pathname === "/beer") {
      document.title = "Punk API";
    } else {
      document.title = "My React App";
    }
  }

  // open menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // click on a menu item
  // 1. set page title
  // 2. push url in router history
  // 3. set document title
  // 4. call the close menu function
  const handleClickItem = (title, url) => {
    setTitle(title);
    history.push(url);
    document.title = title;
    handleClose();
  };

  // close menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className={classes.navbar}>
      {PageTitle()}
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
          {MenuList.map(({ id, title, link, url }) => (
            <Link
              key={id}
              to={url}
              style={{ textDecoration: "none", display: "block" }}
              className={classes.menuItem}
            >
              <MenuItem
                key={id}
                onClick={handleClickItem.bind(this, title, url)}
              >
                {link}
              </MenuItem>
            </Link>
          ))}
        </Menu>
        <Typography variant="h6" className={classes.title}>
          {pageTitle}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
