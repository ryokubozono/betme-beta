import React, { useEffect, useContext, useState } from "react";
import AppLayout from "components/commons/layout/AppLayout";
import { Box, Button, Modal, Fade, ListItem } from "@material-ui/core";
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
import WhatIsBetMeChallenge from "components/Root/WhatIsBetMeChallenge";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AnchorLink from 'react-anchor-link-smooth-scroll';

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    // backgroundColor: '#e60114',
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
  redLink: {
    color: '#f00',
    cursor: 'pointer',
    textDecoration: 'underline',
    '&:hover': {
      color: '#f00',
    }
  },
  underLineFalse: {
    textDecoration: 'none',
  },
  list: {
    listStyle: 'none',
    paddingLeft: 0,
  },
  panel: {
    backgroundColor: '#e60114',
    color: '#fff',
  }
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
  const [whatIsBetMeChallenge, setWhatIsBetMeChallenge] = useState(false);

  const handleAboutBetme = () => {
    setWhatIsBetMeChallenge(true)
  }

  const handleBack = () => {
    setWhatIsBetMeChallenge(false)
  }

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
        <div id='root' />
        <CertBread />
        <section id='cert-top'>
          <Box bgcolor='white' p={2} m={0}>
            <Typography
              component='h1'
            >
              <p>
                <b>
                  {cert.name}
                </b>
              </p>
            </Typography>
            <p>{cert.desc}</p>
            { currentUser && isAllMyExam &&
              <Button
                color='primary'
                fullWidth
                variant="contained"
                onClick={() => history.push(`/`)}
              >
                MY???????????????
              </Button>
            }
            { currentUser && !isAllMyExam &&
              <Button
                color='primary'
                fullWidth
                variant="contained"
                onClick={handleOpen}
              >
                MY?????????????????????
              </Button>
            }
            { !currentUser &&
              <Button
                color='primary'
                fullWidth
                variant="contained"
                onClick={handleSignIn}
              >
                ??????????????????MY?????????????????????
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
                <h2 id="transition-modal-title">???????????????????????????????????????</h2>
                <p id="transition-modal-description">???????????????????????????????????????</p>
                <CertSelectExam 
                  cert={cert} 
                  filteredExams={filteredExams}
                />
              </div>
            </Modal>
            <p>
              My?????????????????????
              <AnchorLink href='#whatIsBetMe' offset="50" className={classes.underLineFalse}>
                <b
                  className={classes.redLink}
                  onClick={handleAboutBetme}
                >
                  BetMe???????????????
                </b>
              </AnchorLink>
              ???????????????????????????
            </p>
          </Box>
        </section>
        <div id='whatIsBetMe' />
        <section id='cert-whatisbetme'>
          {whatIsBetMeChallenge &&
            <Box bgcolor='white' p={2} m={2}>
              <AnchorLink href='#root' offset="50" className={classes.underLineFalse}>
                <ListItem
                  button
                  className={classes.listLink}
                  onClick={handleBack}
                >
                  <ArrowBackIcon
                    fontSize='small'
                  />
                  &nbsp;&nbsp;
                  ??????
                </ListItem>
              </AnchorLink>
              <WhatIsBetMeChallenge 
                setWhatIsBetMeChallenge={setWhatIsBetMeChallenge}
                handleBack={handleBack}
              />
            </Box>
          }
        </section>
        <Spacer />
        <section id='cert-content'>
          <ul className={classes.list}>
            <ExpansionPanel 
              square 
              expanded={expanded === 'panel0'} 
              onChange={handleChange('panel0')} 
              component='li'
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panelCertAbout"
                className={classes.panel}
              >
                <Typography 
                  className={classes.heading}
                  component='h2'
                >
                  {cert.name}??????
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div className={classes.fullWidthTable}>
                  <CertAbout cert={cert} />                
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel 
              square 
              expanded={expanded === 'panel1'} 
              onChange={handleChange('panel1')} 
              component='li'
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panelCertSummary"
                className={classes.panel}
              >
                <Typography 
                  className={classes.heading}
                  component='h2'
                >
                  {cert.name}?????????
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div className={classes.fullWidthTable}>
                  <CertSummary cert={cert} />                
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel 
              square 
              expanded={expanded === 'panel2'} 
              onChange={handleChange('panel2')} 
              component='li'
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panelCertAboutStudy"
                className={classes.panel}
              >
                <Typography 
                  className={classes.heading}
                  component='h2'
                >
                  ????????????
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div>
                  <CertAboutStudy cert={cert} />                
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            {!true &&
            <ExpansionPanel square expanded={expanded === 'panel3'} onChange={handleChange('panel3')} component='li'>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panelAfterPass"
                className={classes.panel}
              >
                <Typography className={classes.heading}>?????????????????????</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div>
                  <CertAfterPass cert={cert} />                
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            }
            
            {!true &&
            <ExpansionPanel square expanded={expanded === 'panel4'} onChange={handleChange('panel4')} component='li'>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panelCertNews"
                className={classes.panel}
              >
                <Typography className={classes.heading}>{cert.name}??????????????????????????????</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div>
                  <CertNews cert={cert} />                
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            }
            <Spacer />
            <Spacer />
            <Spacer />
            <Spacer />
            <Spacer />
            <Spacer />
            <Spacer />
            <Spacer />
            <Spacer />
          </ul>
        </section>
      </AppLayout>
    </>
  )
}

export default CertDetail;
