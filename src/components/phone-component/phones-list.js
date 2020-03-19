import React, { useState, Component } from "react";
import Button from "@material-ui/core/Button";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import Box from "@material-ui/core/Box";

import cloneDeep from "lodash/cloneDeep";
import remove from "lodash/remove";

const styles = {
  root: {
    display: "flex",
    "& > *": {
      margin: 1,
      width: 200
    }
  },
  text: {
    color: "black"
  },
  "& .MuiInput-root": {
    color: "red"
  },
  flexBlock: {
    display: "flex"
  }
};

const useStyles1 = makeStyles(theme =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      flexDirection: "column",
      backgroundColor: theme.palette.background.paper
    },
    form: {}
  })
);

function BtnApply(props) {
  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      onClick={props.onClick}
    >
      {props.nameBtn}
    </Button>
  );
}

function PhoneList(props) {
  const classes1 = useStyles1();
  const { phonesList } = props;

  return (
    <div>
      <List className={classes1.root}>
        {phonesList.map(value => {
          return (
            <ListItem key={value} role={undefined} dense button>
              <ListItemText id={value} primary={`Phone name ${value}`} />
              <ListItemSecondaryAction>
                <IconButton
                  size="small"
                  edge="end"
                  aria-label="comments"
                  onClick={() => props.onClick(value)}
                >
                  <DeleteSweepIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

class Phones extends Component {
  state = { phoneName: "", phonesList: [] };
  handleChange = event => {
    console.log(event);
    this.setState({ phoneName: event });
  };

  // Add
  handleClickApply = event => {
    const { phoneName } = this.state;
    if (phoneName == "") {
      return;
    }
    const phonesList = cloneDeep(this.state.phonesList);
    phonesList.push(phoneName);

    this.setState({ phoneName: "", phonesList: phonesList });
    console.log("handleClick", phoneName);
  };

  // Remove
  handleRemoveItem = value => {
    const phonesList = cloneDeep(this.state.phonesList);
    remove(phonesList, item => {
      return item === value;
    });
    this.setState({ phonesList: phonesList });
  };

  render() {
    const { classes } = this.props;
    const { phoneName, phonesList } = this.state;
    return (
      <div>
        <Typography variant="h3" gutterBottom>
          Page Phones List
        </Typography>
        <Box
          display="flex"
          flexWrap="wrap"
          alignItems="flex-end"
          alignContent="flex-start"
        >
          <TextField
            className={classes.text}
            name="phone"
            id="standard-basic"
            label="Phone name"
            value={phoneName}
            onChange={event => this.handleChange(event.target.value)}
          />
          <BtnApply onClick={this.handleClickApply} nameBtn="Apply"></BtnApply>
        </Box>
        <div>
          <PhoneList
            phonesList={phonesList}
            onClick={this.handleRemoveItem}
          ></PhoneList>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Phones);
