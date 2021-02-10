import React from "react";
import { Link } from "react-router-dom";
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [pageTitle, setTitle] = React.useState("My React App");

  // click on menu item
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // set page title
  const handleClickItem = (title) => {
    handleClose();
    setTitle(title);
  };

  // close menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
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
          {MenuList.map(({ id, title, link, url }) => (
            <Link
              key={id}
              to={url}
              style={{ textDecoration: "none", display: "block" }}
              className={classes.menuItem}
            >
              <MenuItem
                key={id}
                onClick={handleClickItem.bind(this, title, link)}
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
