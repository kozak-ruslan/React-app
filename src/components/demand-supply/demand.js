import React, { Component, createRef } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";



export const Demand = ({demand, qualityViewModel, selectedDemand, onHandleChange}) => {

  const renderDemandTableCell = ({qualityId, demandCustom, demandIndex, demandQualityIndex, onHandleChange}) => {
    return (
      <TableCell
        className="cell-input"
        key={qualityId}
        component="th"
        scope="row"
        align="center"
      >
        <input
          value={demandCustom}
          data-demand-index={demandIndex}
          data-demand-quality-index={demandQualityIndex}
          onChange={onHandleChange}
        />
      </TableCell>
    );
  };

  

  console.log("demand", demand)
  if(demand && demand.length  > 0) {
    return (
      <div>
        {
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
                          renderDemandTableCell({
                            qualityId,
                            demandCustom,
                            demandIndex,
                            demandQualityIndex,
                            onHandleChange
                          })
                      )}
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          
        }
      </div>
    )
  } else {
    return(
      <div>
        Таблица пустая
      </div>
    )
  }
  
}
