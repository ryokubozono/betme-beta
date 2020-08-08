import React, { useContext, useState, useEffect } from 'react';
import { Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import firebase, { db } from "FirebaseConfig";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  textFeild: {
    margin: theme.spacing(1),
  },
  buttonAlign: {
    textAlign: 'center',
  },
}))

const EditTextForm = (props) => {

  const classes = useStyles();
  const [aboutStudyFrag, setAboutStudyFrag] = useState(false);
  const [afterPassFrag, setAfterPassFrag] = useState(false);
  const [newTitleStudy, setNewTitleStudy] = useState('');
  const [newBodyStudy, setNewBodyStudy] = useState('');
  const [newTitlePass, setNewTitlePass] = useState('');
  const [newBodyPass, setNewBodyPass] = useState('');
  const history = useHistory('');

  const handleChange = (event) => {
    switch (event.target.name) {
      case 'newTitleStudy':
        setNewTitleStudy(event.target.value)
        break;
      case 'newBodyStudy':
        setNewBodyStudy(event.target.value)
        break;
      case 'newTitlePass':
        setNewTitlePass(event.target.value)
        break;
      case 'newBodyPass':
        setNewBodyPass(event.target.value)
        break;
      default:
        console.log('no key match')
    }
  }
  
  const clickEditStudy = () => {
    db.collection('cert').doc(props.cert.docId).set({
      aboutStudy: firebase.firestore.FieldValue.arrayUnion({
        title: newTitleStudy,
        body: newBodyStudy,
      })
    }, {merge: true})
    .then(() => {

      history.push({
        pathname: `/admin/cert/edittext/${props.cert.docId}`,
        state: {
          text: '追加しました',
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

  const clickEditPass = () => {
    db.collection('cert').doc(props.cert.docId).set({
      afterPass: firebase.firestore.FieldValue.arrayUnion({
        title: newTitlePass,
        body: newBodyPass,
      })
    }, {merge: true})
    .then(() => {
      history.push({
        pathname: `/admin/cert/edittext/${props.cert.docId}`,
        state: {
          text: '追加しました',
          type: 'success',
        }
      })
    })
    .catch((error) => {
      console.log(error)
      history.push({
        state: {
          text: `${error}`,
          type: 'error',
        }
      })
    })
  }

  const handleDeleteStudy = (item) => {
    if (window.confirm('Are you sure to delete?')) {
      db.collection('cert').doc(props.cert.docId).update({
        aboutStudy: firebase.firestore.FieldValue.arrayRemove({
          title: item.title,
          body: item.body,
        })
      })
      .then(() => {
        history.push({
          pathname: `/admin/cert/edittext/${props.cert.docId}`,
          state: {
            text: '削除しました',
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

  const handleDeletePass = (item) => {
    if (window.confirm('Are you sure to delete?')) {
      db.collection('cert').doc(props.cert.docId).update({
        afterPass: firebase.firestore.FieldValue.arrayRemove({
          title: item.title,
          body: item.body,
        })
      })
      .then(() => {
        history.push({
          pathname: `/admin/cert/edittext/${props.cert.docId}`,
          state: {
            text: '削除しました',
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

  useEffect(() => {
    if (props.cert.aboutStudy && props.cert.aboutStudy.length) {
      setAboutStudyFrag(true)
    } else {
      setAboutStudyFrag(false)
    }
  }, [props.cert.aboutStudy])

  useEffect(() => {
    if (props.cert.afterPass && props.cert.afterPass.length) {
      setAfterPassFrag(true)
    } else {
      setAfterPassFrag(false)
    }
  }, [props.cert.afterPass])

  return (
    <>
      <p>勉強について</p>
      <ValidatorForm
        useRef="form"
        onSubmit={clickEditStudy}
        onError={errors => console.log(errors)}
      >
        {aboutStudyFrag &&
          <>
            {props.cert.aboutStudy.map(item => (
              <>
                <b>{item.title}</b>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button
                  variant='outlined'
                  size='small'
                  onClick={() => handleDeleteStudy(item)}
                >
                  delete
                </Button>
                <Box p={1}>{item.body}</Box>
              </>
            ))}
          </>
        }
        <TextValidator
          label='新規タイトル'
          id="newTitleStudy"
          name='newTitleStudy'
          color='primary'
          style={{ width: 250 }}
          margin="normal"
          value={newTitleStudy}
          onChange={handleChange} 
          validators={['required']}
          errorMessages={['this field is required']}
        />
        <br />
        <TextValidator
          label='新規本文'
          id="newBodyStudy"
          name='newBodyStudy'
          color='primary'
          style={{ width: 250 }}
          multiline
          rows={3}
          margin="normal"
          value={newBodyStudy}
          onChange={handleChange} 
          validators={['required']}
          errorMessages={['this field is required']}
        />
        <br />
        <div className={classes.buttonAlign}>
          <Button 
            type="submit"
            color='secondary'
            variant="contained"
          >
            勉強についての追加
          </Button>
        </div>
      </ValidatorForm>

      <p>合格後について</p>
      <ValidatorForm
        useRef="form"
        onSubmit={clickEditPass}
        onError={errors => console.log(errors)}
      >
        {afterPassFrag &&
          <>
            {props.cert.afterPass.map(item => (
              <>
                <b>{item.title}</b>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button
                  variant='outlined'
                  size='small'
                  onClick={() => handleDeletePass(item)}
                >
                  delete
                </Button>
                <Box p={1}>{item.body}</Box>
              </>
            ))}
          </>
        }
        <TextValidator
          label='新規タイトル'
          id="newTitlePass"
          name='newTitlePass'
          color='primary'
          style={{ width: 250 }}
          margin="normal"
          value={newTitlePass}
          onChange={handleChange} 
          validators={['required']}
          errorMessages={['this field is required']}
        />
        <br />
        <TextValidator
          label='新規本文'
          id="newBodyPass"
          name='newBodyPass'
          color='primary'
          style={{ width: 250 }}
          multiline
          rows={3}
          margin="normal"
          value={newBodyPass}
          onChange={handleChange} 
          validators={['required']}
          errorMessages={['this field is required']}
        />
        <br />
        <div className={classes.buttonAlign}>
          <Button 
            type="submit"
            color='secondary'
            variant="contained"
          >
            合格後についての追加
          </Button>
        </div>
      </ValidatorForm>

    </>
  )
}

export default EditTextForm;
