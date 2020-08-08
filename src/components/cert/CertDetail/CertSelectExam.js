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
import firebase, { db } from "FirebaseConfig";
import { AuthContext } from "hooks/Auth";
import { useHistory } from 'react-router-dom';
import { UserContext } from 'hooks/User';
import paths from 'paths';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.black,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 6,
    paddingRight: 6,
  },
  body: {
    color: theme.palette.common.black,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 6,
    paddingRight: 6,
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#eee',
    },
  },
}))(TableRow);

const SelectedTableRow = withStyles((theme) => ({
  root: {
    backgroundColor: '#ddd',
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    width: '100%',

  },
});

const CertSelectExam = (props) => {
  const classes = useStyles();
  const { exams } = useContext(ExamsContext);
  const { user } = useContext(UserContext);
  const { currentUser } = useContext(AuthContext);
  const history = useHistory('');

  const handleMyExam = (exam) => {
    if (window.confirm('My試験に登録しますか?')) {

      db.collection('user').doc(currentUser.uid).set({
        uid: currentUser.uid,
        docId: currentUser.uid,
        myExam: firebase.firestore.FieldValue.arrayUnion(exam.uid)
      }, {merge: true})
      .then(() => {
        history.push({
          pathname: '/',
          search: `examId=${exam.uid}`,
          state: {
            text: 'My試験に追加しました',
            type: 'success',
          }
        })
      })
      .catch((error) => {
        console.log(error)
        // history.go(0)
        history.push({
          state: {
            text: `${error}`,
            type: 'error',
          }
        })
      })
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell align="center">受験する資格試験</StyledTableCell>
            <StyledTableCell align="center">試験日</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.filteredExams.map(exam => (
            <>
              {exam.isMyExam ? (
                <SelectedTableRow 
                  key={exam.uid}
                >
                  <StyledTableCell component="th" scope="row">
                    {exam.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">{exam.isMyExam && '登録済'}</StyledTableCell>
                  <StyledTableCell align="center">{exam.examDate && <GetYearMonthDate timestamp={exam.examDate} />}</StyledTableCell>
                </SelectedTableRow>
              ):(
                <StyledTableRow 
                  key={exam.uid}
                  onClick={() => handleMyExam(exam)}
                >
                  <StyledTableCell component="th" scope="row">
                    {exam.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">{exam.isMyExam && '登録済'}</StyledTableCell>
                  <StyledTableCell align="center">{exam.examDate && <GetYearMonthDate timestamp={exam.examDate} />}</StyledTableCell>
                </StyledTableRow>
              )}
            </>            
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CertSelectExam;
