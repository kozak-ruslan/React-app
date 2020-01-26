import React, { Component, createRef } from "react";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import "./demand-supply.css";
import recalculateTotal from "./total";
import differenceBy from "lodash/differenceBy";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CircularProgress from "@material-ui/core/CircularProgress";

// Multiselect
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import find from "lodash/find";
import { connect } from "react-redux";
import actions from "../actions";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};


class DemandSupply extends Component {
  constructor(props) {
    super(props);
    this.tableRef = createRef();
    this.inputRef = [];
  }

  state = {
    demand: [],
    supply: [],
    qualityViewModel: [
      {
        qualityId: 1,
        qualityName: "зольность <=39%"
      },
      {
        qualityId: 2,
        qualityName: "зольность 39-41.5%"
      },
      {
        qualityId: 3,
        qualityName: "зольность > 41.5%"
      },
      {
        qualityId: 4,
        qualityName: "концентрат"
      }
    ],
    totalQualityDemandSupply: [],
    checked: false,
    selectedDemand: [],
    currentSelectedDemand: [],
    isShowBtnApply: false,
    phones:[]
  };

  componentDidMount() {
    this.getDataDemandSupply();
  };

  async getDataDemandSupply() {
    const response = await Axios.get("/fake/demand-supply-dto.json");
    const { data: { demand, supply } = {} } = response;
    const { qualityViewModel } = this.state;
    const selectedDemand = this.getDefaultDemand(demand);
    const recalculateTotalDS = recalculateTotal({
      supply,
      demand,
      qualityViewModel
    });
    this.setState({
      selectedDemand: selectedDemand,
      currentSelectedDemand: selectedDemand,
      demand,
      supply,
      totalQualityDemandSupply: recalculateTotalDS
    });
  };

  handleChange = event => {
    this.setState({ checked: event.target.checked });
  };

  handleDemandChange = e => {
    const { demand } = this.state;
    const demandIndex = e.target.getAttribute("data-demand-index");
    const demandQualityIndex = e.target.getAttribute(
      "data-demand-quality-index"
    );
    demand[demandIndex].demandQuality[demandQualityIndex].demandCustom = +e
      .target.value;
    const recalculateTotalDS = recalculateTotal(this.state);
    this.setState({ demand, totalQualityDemandSupply: recalculateTotalDS });
  };

  renderDemandTableCell(props) {
    return (
      <TableCell
        className="cell-input"
        key={props.qualityId}
        component="th"
        scope="row"
        align="center"
      >
        <input
          value={props.demandCustom}
          data-demand-index={props.demandIndex}
          data-demand-quality-index={props.demandQualityIndex}
          onChange={this.handleDemandChange}
        />
      </TableCell>
    );
  };

  handleSupplyChange(e, supplyIndex, supplyQualityIndex) {
    const { supply } = this.state;
    supply[supplyIndex].wagonSupplyQuality[
      supplyQualityIndex
    ].companyWagonsCustom = +e.target.value;
    console.log(this.state);
    const recalculateTotalDS = recalculateTotal(this.state);
    this.setState({ supply, totalQualityDemandSupply: recalculateTotalDS });
  };

  handleKeyDown(event, rowIndex, colIndex) {
    const tableRef = this.tableRef.current;
    switch (event.keyCode) {
      case 39: // right
        if (tableRef.rows[rowIndex + 1].cells.length - 2 >= colIndex) {
          const input =
            tableRef.rows[rowIndex + 1].cells[colIndex + 2].firstElementChild;
          input.focus();
          input.click();
        }
        break;

      case 37: // left
        break;

      case 38: // up
        break;

      case 40: // down
      case 13: // enter
        break;
      default:
        break;
    }
  };

  renderSupplyTableCell(props) {
    const {
      qualityId,
      supplyIndex: rowIndex,
      wagonSupplyIndex: colIndex,
      companyWagonsCustom
    } = props;
    return (
      <TableCell
        className="cell-input"
        key={qualityId}
        component="th"
        scope="row"
        align="center"
        editable_cell="true"
      >
        <input
          value={companyWagonsCustom}
          onChange={e => this.handleSupplyChange(e, rowIndex, colIndex)}
          onKeyDown={e => this.handleKeyDown(e, rowIndex, colIndex)}
        ></input>
        {/* <TextField
                  ref={ref => this.inputRef[colIndex] = ref}
                  tabIndex="0"
                  id="standard-number"
                  label="Number"
                  type="number"
                  data-row={rowIndex}
                  data-col={colIndex}
                  defaultValue={companyWagonsCustom}
                  onChange={
                      e => 
                      this.handleSupplyChange(e, rowIndex, colIndex)
                  }
                  InputLabelProps={{
                      shrink: true,
                  }}
                  onKeyDown={
                      e =>
                      this.handleKeyDown(e,  rowIndex, colIndex)
                  }
              /> */}
      </TableCell>
    );
  };

  getDefaultDemand(receivers) {
    const result = [];
    receivers.forEach(receiver => {
      if (receiver.isSupplyDemandDefault) {
        result.push(receiver);
      }
    });
    return result;
  };

  handleMultiSelectChangeDemand = event => {
    console.log(event);
    const selectedValue = event;
    let isShowBtnApply = false;
    const {demand} = this.state;
    const diffSelect = differenceBy(selectedValue, demand, "receiverCompanyId");
    const diffCurrent = differenceBy(demand, selectedValue, "receiverCompanyId");
    if (
      (diffSelect && diffSelect.length > 0) ||
      (diffCurrent && diffCurrent.length > 0)
    ) {
      isShowBtnApply = true;
    } else {
      isShowBtnApply = false;
    }
    this.setState({ isShowBtnApply: isShowBtnApply, currentSelectedDemand: selectedValue });
  };

  applyChanges = () => {
    const { demand, currentSelectedDemand, isShowBtnApply } = this.state
    demand.forEach(sender=>{
        if(find(currentSelectedDemand, {'receiverCompanyId': sender.receiverCompanyId })){
            sender.isSupplyDemandDefault = true;
        } else {
            sender.isSupplyDemandDefault = false;
        }
    });

    this.setState({selectedDemand: currentSelectedDemand, isShowBtnApply: false });
  };

  handleClickDemand = param => e => {
    console.log("param", param);
  };
  handleActions = () => {
    const phone = [ "iPhone 8", "Samsung" ];
    this.props.addPhone(phone);
  }
  render() {
    const {
      selectedDemand,
      qualityViewModel,
      supply,
      demand,
      totalQualityDemandSupply,
      checked,
      isShowBtnApply,
      currentSelectedDemand
    } = this.state;

    if (supply.length > 0 || demand.length > 0) {
      return (
        <div className="page-demand-supply">
        <Button
            variant="contained"
            color="primary"
            onClick={this.handleActions}
          >
            Button Primary
          </Button>
          <FormControlLabel
            control={<Switch checked={checked} onChange={this.handleChange} />}
            label="Show"
          />
          {checked && <div>22</div>}
          {!checked && <div>33</div>}
          <TableContainer component={Paper}>
            <h3>Total</h3>
            <Table aria-label="simple table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Описание</TableCell>
                  <TableCell>Группа</TableCell>
                  <TableCell>Наличие угля</TableCell>
                  <TableCell>Потребность на сегодня</TableCell>
                  <TableCell>Разница</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {totalQualityDemandSupply.map((row, i) => (
                  <TableRow key={i} align="center">
                    <TableCell component="th" scope="row">
                      {row.qualityName}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.qualityId}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.companyWagons}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.demand}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.diff}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <h3>Demand</h3>

            <FormControl>
              <InputLabel id="demo-mutiple-checkbox-label">Tag</InputLabel>
              <Select
                labelId="demo-mutiple-checkbox-label"
                id="demo-mutiple-checkbox"
                multiple
                value={currentSelectedDemand}
                input={<Input />}
                onChange={(e) => {
                  this.handleMultiSelectChangeDemand(e.target.value)
                }}
                renderValue={items => {
                  return items.map(
                    (item) => item.receiverCompanyName + ', '
                  );
                }}
                MenuProps={MenuProps}>
                {demand.map(d => {
                  const { receiverCompanyId, receiverCompanyName } = d || {};
                  return (
                  <MenuItem
                    key={receiverCompanyId}
                    value={d}>
                    <Checkbox checked={find(currentSelectedDemand, {"receiverCompanyId": receiverCompanyId})? true: false} />
                    <ListItemText
                      id={receiverCompanyId}
                      primary={receiverCompanyName}/>
                  </MenuItem>
                )
                })}
              </Select>
            </FormControl>

            {isShowBtnApply && (
              <Button
                variant="contained"
                color="primary"
                onClick={this.applyChanges}
              >
                Button Primary
              </Button>
            )}
            <Table aria-label="simple table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Предприятия</TableCell>
                  {qualityViewModel.map((row, i) => (
                    <TableCell key={i} align="center">
                      {row.qualityId}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedDemand.map(
                  ({ receiverCompanyName, demandQuality }, demandIndex) => (
                    <TableRow key={demandIndex}>
                      <TableCell component="th" scope="row">
                        {receiverCompanyName}
                      </TableCell>
                      {demandQuality.map(
                        ({ demandCustom, qualityId }, demandQualityIndex) =>
                          this.renderDemandTableCell({
                            qualityId,
                            demandCustom,
                            demandIndex,
                            demandQualityIndex
                          })
                      )}
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>

            <h3>Supply</h3>
            <Table
              aria-label="simple table"
              ref={this.tableRef}
              size="small"
              padding="none"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Предприятия</TableCell>
                  {qualityViewModel.map((row, i) => (
                    <TableCell key={i} align="center">
                      {row.qualityId}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {supply.map(
                  ({ senderCompanyName, wagonSupplyQuality }, supplyIndex) => (
                    <TableRow key={supplyIndex}>
                      <TableCell component="th" scope="row">
                        {senderCompanyName}
                      </TableCell>
                      {wagonSupplyQuality.map(
                        (
                          { companyWagonsCustom, qualityId },
                          wagonSupplyIndex
                        ) =>
                          this.renderSupplyTableCell({
                            qualityId,
                            companyWagonsCustom,
                            supplyIndex,
                            wagonSupplyIndex
                          })
                      )}
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      );
    } else {
      return <CircularProgress disableShrink />;
    }
  };
}


function mapStateToProps(state) {
  // return {
  //   phones: state.get("phones")
  // };
}

export default connect(mapStateToProps, actions)(DemandSupply);

