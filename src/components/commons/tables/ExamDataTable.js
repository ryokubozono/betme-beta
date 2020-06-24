import React, { useState, useContext, useEffect } from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ImportContacts from '@material-ui/icons/ImportContacts';
import Create from '@material-ui/icons/Create';
import Schedule from '@material-ui/icons/Schedule';
import { Link } from "@material-ui/core";


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
            <StyledTableCell component="td" scope="row" align="left">
              資格名
            </StyledTableCell>
            <StyledTableCell align="left">
            {props.cert.name}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="td" scope="row" align="left">
              試験区分
            </StyledTableCell>
            <StyledTableCell align="left">
              {props.cert.division}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="td" scope="row"　align="left">
              主催団体
            </StyledTableCell>
            <StyledTableCell align="left">
            {props.cert.sponsor}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="td" scope="row"　align="left">
              受験資格
            </StyledTableCell>
            <StyledTableCell align="left">
            {props.cert.qual}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="td" scope="row"　align="left">
              試験間隔
            </StyledTableCell>
            <StyledTableCell align="left">
            {props.cert.freq}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="td" scope="row"　align="left">
              目安勉強時間
            </StyledTableCell>
            <StyledTableCell align="left">
            {props.cert.studyTime}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="td" scope="row"　align="left">
              試験時間
            </StyledTableCell>
            <StyledTableCell align="left">
            {props.cert.examTime}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="td" scope="row"　align="left">
              出題形式
            </StyledTableCell>
            <StyledTableCell align="left">
            {props.cert.format}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="td" scope="row"　align="left">
              受験手数料
            </StyledTableCell>
            <StyledTableCell align="left">
            {props.cert.fee}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="td" scope="row"　align="left">
              試験会場
            </StyledTableCell>
            <StyledTableCell align="left">
            {props.cert.testCenter}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="td" scope="row"　align="left">
              難易度
            </StyledTableCell>
            <StyledTableCell align="left">
            {props.cert.difficulty}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="td" scope="row"　align="left">
              合格率
            </StyledTableCell>
            <StyledTableCell align="left">
            {props.cert.passRate}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="td" scope="row"　align="left">
              合格基準
            </StyledTableCell>
            <StyledTableCell align="left">
            {props.cert.passMark}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="td" scope="row"　align="left">
              問合せ先
            </StyledTableCell>
            <StyledTableCell align="left">
            {props.cert.refOrg}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="td" scope="row"　align="left">
              web
            </StyledTableCell>
            <StyledTableCell align="left">
              <Link
                href={props.cert.refWeb}
                target="_blank"
              >
                {props.cert.refWeb}
              </Link>
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ExamDataTable;
