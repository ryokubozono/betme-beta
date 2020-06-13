import React, { useState, useContext, useEffect } from "react";
import { ExamsContext } from "hooks/Exams";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import GetYearMonthDate from 'components/commons/atoms/GetYearMonthDate';
import ImportContacts from '@material-ui/icons/ImportContacts';
import Create from '@material-ui/icons/Create';
import Schedule from '@material-ui/icons/Schedule';


const StyledTableCell = withStyles((theme) => ({
  body: {
    // fontSize: 11,
    color: theme.palette.black,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 2,
    paddingRight:2,
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    width: 260,
  },
});

const ExamDataTable = (props) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableBody>
          <StyledTableRow>
            <StyledTableCell component="td" scope="row"　align="center">
              <ImportContacts fontSize="small" />
              &nbsp;
              難易度
            </StyledTableCell>
            <StyledTableCell align="center">
            {props.cert.difLevel}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="td" scope="row"　align="center">
              <Create fontSize="small" />
              &nbsp;
              学習時間
            </StyledTableCell>
            <StyledTableCell align="center">
              {props.cert.studyTime} [hr]
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="td" scope="row"　align="center">
              <Schedule fontSize="small" />
              &nbsp;
              試験時間
            </StyledTableCell>
            <StyledTableCell align="center">
            {props.cert.examTime} [min]
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="td" scope="row"　align="center">
              <Schedule fontSize="small" />
              &nbsp;
              試験時間
            </StyledTableCell>
            <StyledTableCell align="center">
            {props.cert.examTime} [min]
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="td" scope="row"　align="center">
              <Schedule fontSize="small" />
              &nbsp;
              試験時間
            </StyledTableCell>
            <StyledTableCell align="center">
            {props.cert.examTime} [min]
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="td" scope="row"　align="center">
              <Schedule fontSize="small" />
              &nbsp;
              試験時間
            </StyledTableCell>
            <StyledTableCell align="center">
            {props.cert.examTime} [min]
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="td" scope="row"　align="center">
              <Schedule fontSize="small" />
              &nbsp;
              試験時間
            </StyledTableCell>
            <StyledTableCell align="center">
            {props.cert.examTime} [min]
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="td" scope="row"　align="center">
              <Schedule fontSize="small" />
              &nbsp;
              試験時間
            </StyledTableCell>
            <StyledTableCell align="center">
            {props.cert.examTime} [min]
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ExamDataTable;
