import React, { useEffect, useContext, useState } from "react";
import AppLayout from "components/commons/layout/AppLayout";
import { Box, Button, Modal, Fade } from "@material-ui/core";
import { useLocation } from 'react-router-dom';
import { CertsContext } from "hooks/Certs";
import { CertFindFilter } from 'components/commons/filters/CertFindFilter';
import Spacer from "components/commons/atoms/Spacer";
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CertSummary from 'components/cert/CertDetail/CertSummary';
import CertAboutStudy from "components/cert/CertDetail/CertAboutStudy";
import CertAbout from 'components/cert/CertDetail/CertAbout';
import CertNews from "components/cert/CertDetail/CertNews";
import CertAfterPass from "components/cert/CertDetail/CertAfterPass";
import CertSelectExam from "./CertSelectExam";
import { AuthContext } from "hooks/Auth";
import CertBread from 'components/cert/CertDetail/CertBread';
import paths from 'paths';
import { useHistory } from 'react-router-dom';
import { ExamsContext } from "hooks/Exams";
import { UserContext } from "hooks/User";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  fullWidthTable: {
    margin: 'auto',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
  },
}))

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const CertDetail = (props) => {
  const classes = useStyles();
  const location = useLocation();
  const [cert, setCert] = useState('');
  const { certs } = useContext(CertsContext); 
  const [expanded, setExpanded] = useState('');
  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();
  const { exams } = useContext(ExamsContext);
  const { user } = useContext(UserContext);
  const [filteredExams, setFilteredExams] = useState([])
  const [isAllMyExam, setIsAllMyExam] = useState(true);

  useEffect(() => {
    let tmpExams = []
    if (exams) {
      console.log('pass')
      tmpExams = exams;
      tmpExams = tmpExams.filter(row => {
        if (row.certId === cert.docId) {
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
      let refExams = []
      tmpExams.forEach(exam => {
        let isMyExam = false
        if (user.myExam && (user.myExam).indexOf(exam.docId) !== -1) {
          isMyExam = true
        }
        refExams.push({
          uid: exam.docId,
          name: exam.name,
          isMyExam: isMyExam,
          applyDate: exam.applyDate,
          examDate: exam.examDate
        })
      })
      refExams.filter(exam => {
        if (exam.isMyExam === false) {
          setIsAllMyExam(false)
        }
      })
      setFilteredExams(refExams)
      console.log(refExams)
    }
  }, [exams, cert, user])


  useEffect(() => {
    if (location.pathname) {
      let certRef = CertFindFilter(certs, location.pathname.substr(-20))
      if (certRef) {
        setCert(certRef)
      }
    } else {
      console.log('no iud')
    }
  }, [certs, location.pathname])

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSignIn = () => {
    history.push(`${paths.signin}`)
  }

  return (
    <>
      <AppLayout>
        <CertBread />
        <Box bgcolor='white' p={2} m={0}>
          <h2>{cert.name}</h2>
          <p>{cert.desc}</p>
          { currentUser && isAllMyExam &&
            <Button
              color='primary'
              fullWidth
              variant="contained"
              onClick={() => history.push(`/`)}
            >
              受験する資格試験に移動
            </Button>
          }
          { currentUser && !isAllMyExam &&
            <Button
              color='primary'
              fullWidth
              variant="contained"
              onClick={handleOpen}
            >
              受験する資格試験に登録する
            </Button>
          }
          { !currentUser &&
            <Button
              color='primary'
              fullWidth
              variant="contained"
              onClick={handleSignIn}
            >
              ログインして受験する資格試験に登録する
            </Button>
          }

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
          >
            <div className={classes.paper}>
              <h2 id="transition-modal-title">受験する資格試験に登録する</h2>
              <p id="transition-modal-description">選択可能な試験は以下です。</p>
              <CertSelectExam 
                cert={cert} 
                filteredExams={filteredExams}
              />
            </div>
          </Modal>
        </Box>      
        <Spacer />
        <div className={classes.root}>
          <ExpansionPanel square expanded={expanded === 'panel0'} onChange={handleChange('panel0')}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panelCertAbout"
            >
              <Typography className={classes.heading}>{cert.name}とは</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div className={classes.fullWidthTable}>
                <CertAbout cert={cert} />                
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panelCertSummary"
            >
              <Typography className={classes.heading}>{cert.name}の概要</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div className={classes.fullWidthTable}>
                <CertSummary cert={cert} />                
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panelCertAboutStudy"
            >
              <Typography className={classes.heading}>攻略方法</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div>
                <CertAboutStudy cert={cert} />                
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          {!true &&
          <ExpansionPanel square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panelAfterPass"
            >
              <Typography className={classes.heading}>合格後について</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div>
                <CertAfterPass cert={cert} />                
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          }
          
          {!true &&
          <ExpansionPanel square expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panelCertNews"
            >
              <Typography className={classes.heading}>{cert.name}についての記事を読む</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div>
                <CertNews cert={cert} />                
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          }
        </div>
      </AppLayout>
    </>
  )
}

export default CertDetail;
