import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// beer page style
const newStyles = makeStyles(() => ({
  root: {
    textAlign: "center",
    margin: 20,
  },
  beerName: {
    marginTop: 14,
  },
}));

// accordion style
const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

// accordion summary style
const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

// accordion details style
const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

// accordion rotating button style
const useStyles = makeStyles((theme) => ({
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
}));

export default function Beer() {
  //properties
  const classes = newStyles();
  const accordionButtonClasses = useStyles();
  const [datas, setData] = useState([]);
  const [expanded, setExpanded] = useState(false);

  // change accordion state on click event
  const handleChange = (id) => (event, newExpanded) => {
    setExpanded(newExpanded ? id : false);
  };

  // fetch API using axios
  function FetchApi() {
    useEffect(() => {
      axios
        .get("https://api.punkapi.com/v2/beers")
        .then((response) => setData(response.data));
    }, []);
  }

  // return JSON from API
  /*   function ReturnJson() {
    return <code>{JSON.stringify(datas)}</code>;
  } */

  return (
    <div className={classes.root}>
      {FetchApi()}
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          {datas.map((data) => (
            <Accordion
              key={`accordion ${data.id}`}
              square
              expanded={expanded === data.id}
              onChange={handleChange(data.id)}
            >
              <AccordionSummary>
                <Typography className={classes.beerName}>
                  {data.name}
                </Typography>
                <IconButton
                  className={
                    expanded !== data.id
                      ? accordionButtonClasses.expand
                      : accordionButtonClasses.expandOpen
                  }
                  aria-label="Show less"
                  title="Show less"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableBody>
                      <TableRow key={data.id}>
                        <TableCell component="th" scope="row">
                          <img
                            width="50px"
                            src={data.image_url}
                            alt={data.name}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {data.description}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </React.Fragment>
    </div>
  );
}
