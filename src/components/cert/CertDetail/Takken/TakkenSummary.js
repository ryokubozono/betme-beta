import React, { useState, useContext, useEffect } from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Link } from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ExamsContext } from "hooks/Exams";
import GetYearMonthDate from 'components/commons/atoms/GetYearMonthDate';
import Spacer from "components/commons/atoms/Spacer";

const StyledListItem = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },

  },
}))(ListItem);

const StyledListItemText = withStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    textAlign: 'left',
  },
}))(ListItemText);

const useStyles = makeStyles((theme) => ({
  nested1: {
    paddingLeft: theme.spacing(0),
  },
  nested2: {
    paddingLeft: theme.spacing(4),
  },
  nested3: {
    paddingLeft: theme.spacing(8),
  },
}));

const TakkenSummary = (props) => {

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
      tmpExams = tmpExams.filter(row => {
        if (row.isDisable) {
          return false
        } else {
          return row
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
    <>
      <List>
        <ListItem>
          <StyledListItemText 
            primary="試験実施"
          />
        </ListItem>
        <ListItem className={classes.nested3}>
          試験頻度：{props.cert.freq}
        </ListItem>
        <ListItem className={classes.nested3}>
          試験時間：{props.cert.examTime}
        </ListItem>
        <ListItem className={classes.nested3}>
          出題形式：{props.cert.format}
        </ListItem>
        <ListItem>
          <StyledListItemText
            primary="　　　　　"
          />
          <StyledListItemText 
            primary="試験申込"
          />
          <StyledListItemText 
            primary="試験日"
          />
        </ListItem>
        {filteredExams.map(exam => (
          <ListItem>
            <StyledListItemText 
              primary={exam.name}
            />
            <StyledListItemText 
              primary={exam.applyDate && <GetYearMonthDate timestamp={exam.applyDate} />}
            />
            <StyledListItemText 
              primary={exam.examDate && <GetYearMonthDate timestamp={exam.examDate} />}
            />
          </ListItem>
        ))}
      </List>

      <Spacer />
      
      <List>
        <StyledListItem>
          <StyledListItemText 
            primary="資格名"
          />
          <StyledListItemText 
            primary={props.cert.name}
          />
        </StyledListItem>
        
        <StyledListItem>
          <StyledListItemText 
            primary="試験区分"
          />
          <StyledListItemText 
            primary={props.cert.division}
          />
        </StyledListItem>
        <StyledListItem>
          <StyledListItemText 
            primary="主催団体"
          />
          <StyledListItemText 
            primary={props.cert.sponsor}
          />
        </StyledListItem>
        <StyledListItem>
          <StyledListItemText 
            primary="受験資格"
          />
          <StyledListItemText 
            primary={props.cert.qual}
          />
        </StyledListItem>
        <StyledListItem>
          <StyledListItemText 
            primary="受験手数料"
          />
          <StyledListItemText 
            primary={props.cert.fee}
          />
        </StyledListItem>
        <StyledListItem>
          <StyledListItemText 
            primary="試験会場"
          />
          <StyledListItemText 
            primary={props.cert.testCenter}
          />
        </StyledListItem>

        <StyledListItem>
          <StyledListItemText 
            primary="合格率"
          />
          <StyledListItemText 
            primary={props.cert.passRate}
          />
        </StyledListItem>
        <StyledListItem>
          <StyledListItemText 
            primary="合格基準"
          />
          <StyledListItemText 
            primary={props.cert.passMark}
          />
        </StyledListItem>
        <StyledListItem>
          <StyledListItemText 
            primary="問合せ先"
          />
          <StyledListItemText 
            primary={props.cert.refOrg}
          />
        </StyledListItem>
        <StyledListItem>
          <StyledListItemText 
            primary="web"
          />
          <StyledListItemText>
            <Link
              href={props.cert.refWeb}
              target="_blank"
            >
              {props.cert.refWeb}
            </Link>
          </StyledListItemText>
        </StyledListItem>
        <StyledListItem>
          <StyledListItemText 
            primary="目安勉強時間"
          />
          <StyledListItemText 
            primary={props.cert.studyTime}
          />
        </StyledListItem>
        <StyledListItem>
          <StyledListItemText 
            primary="難易度"
          />
          <StyledListItemText 
            primary={props.cert.difficulty}
          />
        </StyledListItem>
      </List>
    </>
  )
}

export default TakkenSummary;