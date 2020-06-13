import React, { useState, useContext, useEffect } from "react";
import { ExamsContext } from "hooks/Exams";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import GetYearMonthDate from 'components/commons/atoms/GetYearMonthDate';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.black,
    fontSize: 12,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 2,
    paddingRight:2,
  },
  body: {
    fontSize: 12,
    color: theme.palette.common.black,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 2,
    paddingRight: 2,
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    width: '100%',

  },
});

const ExamDateTable = (props) => {
  const classes = useStyles();
  const { exams } = useContext(ExamsContext);
  const [filteredExams, setFilteredExams] = useState([])

  useEffect(() => {
    let tmpExams = []
    if (exams) {
      tmpExams = exams;
      tmpExams = tmpExams.filter(row => {
        if (row.certId === props.cert.docId) {
          return row;
        } else {
          return false;
        }
      })
      tmpExams.sort(function(a,b){
        if(a.examDate.seconds < b.examDate.seconds) return -1;
        if(a.examDate.seconds > b.examDate.seconds) return 1;
        return 0;
      });
      setFilteredExams(tmpExams)
    }
  }, [exams, props.cert])

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell align="center">試験申込</StyledTableCell>
            <StyledTableCell align="center">試験日</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredExams.map(exam => (
            <StyledTableRow key={exam.uid}>
              <StyledTableCell component="th" scope="row">
                {exam.name}
              </StyledTableCell>
              <StyledTableCell align="center">{exam.applyDate && <GetYearMonthDate timestamp={exam.applyDate} />}</StyledTableCell>
              <StyledTableCell align="center">{exam.examDate && <GetYearMonthDate timestamp={exam.examDate} />}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ExamDateTable;
