import React, { useState, Suspense, forwardRef } from "react";
import ImageList from "./ImageList";
import Loader from "../Loader/Loader.js";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import ImageSearchIcon from "@material-ui/icons/ImageSearch";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Slide from "@material-ui/core/Slide";

// image grid page style
const useStyles = makeStyles((theme) => ({
  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    margin: 20,
  },
  gridList: {
    width: 500,
    height: 492,
  },
  imgTile: {
    cursor: "default",
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  headerBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  title: {
    color: theme.palette.grey[200],
  },
  header: {
    color: theme.palette.grey[200],
  },
  author: {
    color: theme.palette.grey[400],
  },
  imgModal: {
    width: 500,
  },
  loopIcon: {
    color: theme.palette.grey[200],
  },
  starIcon: {
    color: theme.palette.warning.light,
  },
}));

// dialog style
const styles = (theme) => ({
  root: {
    margin: 0,
    background: theme.palette.primary.light,
    color: theme.palette.grey[200],
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[200],
  },
});

// slide transition for dialog
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Gallery() {
  // properties
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [imgId, setId] = useState(null);
  const [imgTitle, setTitle] = useState("");
  const [imgAuthor, setAuthor] = useState("");
  const [imgUrl, setUrl] = useState("");
  const [clicks, setClicks] = useState([]);

  // dialog title template
  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

  // dialog content template
  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);

  // click on loop action
  const handleClick = (item) => {
    activeItemId(item);
    modalOpen();
  };

  // find image (id, title, author, url)
  const activeItemId = (id) => {
    const getTile = ImageList.find((tile) => tile.id === id);
    const getTitle = (getTile && getTile.title) || "";
    const getAuthor = (getTile && getTile.author) || "";
    const getUrl = (getTile && getTile.img) || "";
    setId(id.toString());
    setTitle(getTitle);
    setAuthor(getAuthor);
    setUrl(getUrl);
  };

  // click on star icon
  const handleIconClick = (id) => {
    let result = clicks.includes(id)
      ? clicks.filter((click) => click !== id)
      : [...clicks, id];
    setClicks(result);
  };

  // open dialog
  const modalOpen = () => {
    setOpen(true);
  };

  //close dialog
  const modalClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <div className={classes.grid}>
            <GridList cellHeight={160} className={classes.gridList} cols={3}>
              {ImageList.map(({ id, img, title, author, cols }) => (
                <GridListTile
                  key={id}
                  cols={cols || 1}
                  className={classes.imgTile}
                  title={title}
                >
                  <img src={img} alt={title} />
                  <GridListTileBar
                    classes={{
                      title: classes.header,
                    }}
                    titlePosition="top"
                    actionIcon={
                      <IconButton
                        aria-label={`star ${id}`}
                        className={classes.starIcon}
                        title="Star"
                        key={id}
                        onClick={handleIconClick.bind(this, id)}
                      >
                        {clicks.includes(id) ? (
                          <StarIcon />
                        ) : (
                          <StarBorderIcon />
                        )}
                      </IconButton>
                    }
                    actionPosition="left"
                    className={classes.headerBar}
                  />
                  <GridListTileBar
                    title={title}
                    subtitle={
                      <span className={classes.author}>by: {author}</span>
                    }
                    classes={{
                      title: classes.title,
                    }}
                    actionIcon={
                      <IconButton
                        aria-label={`star ${id}`}
                        className={classes.loopIcon}
                        title="Zoom"
                        key={id}
                        onClick={handleClick.bind(this, id)}
                      >
                        <ImageSearchIcon />
                      </IconButton>
                    }
                    actionPosition="right"
                    className={classes.titleBar}
                  />
                </GridListTile>
              ))}
            </GridList>
            <Dialog
              TransitionComponent={Transition}
              onClose={modalClose}
              aria-labelledby={imgId}
              open={open}
            >
              <DialogTitle id={imgId} onClose={modalClose}>
                {imgTitle} by {imgAuthor}
              </DialogTitle>
              <DialogContent dividers>
                <Typography gutterBottom>
                  <Suspense fallback={<Loader />}>
                    <img
                      className={classes.imgModal}
                      src={imgUrl}
                      alt={imgTitle}
                    />
                  </Suspense>
                </Typography>
              </DialogContent>
            </Dialog>
          </div>
        </Container>
      </React.Fragment>
    </div>
  );
}
