import React, { useState, useContext, useEffect } from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Link } from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const StyledListItem = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(ListItem);

const ExamDataTable = (props) => {

  return (
    <>
      <List>
        <StyledListItem>
          <ListItemText 
            primary="項目名テスト"
          />
          <ListItemText 
            primary='手手手手手手手手手手って手手てててっててててて'
          />
        </StyledListItem>
        <StyledListItem>
          <ListItemText 
            primary="資格名"
          />
          <ListItemText 
            primary={props.cert.name}
          />
        </StyledListItem>
        <StyledListItem>
          <ListItemText 
            primary="試験区分"
          />
          <ListItemText 
            primary={props.cert.division}
          />
        </StyledListItem>
        <StyledListItem>
          <ListItemText 
            primary="主催団体"
          />
          <ListItemText 
            primary={props.cert.sponsor}
          />
        </StyledListItem>
        <StyledListItem>
          <ListItemText 
            primary="受験資格"
          />
          <ListItemText 
            primary={props.cert.qual}
          />
        </StyledListItem>
        <StyledListItem>
          <ListItemText 
            primary="試験実施"
          />
          <ListItemText>
            {props.cert.freq}
  
          </ListItemText>
          
        </StyledListItem>
        <StyledListItem>
          <ListItemText 
            primary="目安勉強時間"
          />
          <ListItemText 
            primary={props.cert.studyTime}
          />
        </StyledListItem>
        <StyledListItem>
          <ListItemText 
            primary="資格名"
          />
          <ListItemText 
            primary={props.cert.name}
          />
        </StyledListItem>
        <StyledListItem>
          <ListItemText 
            primary="試験時間"
          />
          <ListItemText 
            primary={props.cert.examTime}
          />
        </StyledListItem>
        <StyledListItem>
          <ListItemText 
            primary="出題形式"
          />
          <ListItemText 
            primary={props.cert.format}
          />
        </StyledListItem>
        <StyledListItem>
          <ListItemText 
            primary="受験手数料"
          />
          <ListItemText 
            primary={props.cert.fee}
          />
        </StyledListItem>
        <StyledListItem>
          <ListItemText 
            primary="試験会場"
          />
          <ListItemText 
            primary={props.cert.testCenter}
          />
        </StyledListItem>
        <StyledListItem>
          <ListItemText 
            primary="難易度"
          />
          <ListItemText 
            primary={props.cert.difficulty}
          />
        </StyledListItem>
        <StyledListItem>
          <ListItemText 
            primary="合格率"
          />
          <ListItemText 
            primary={props.cert.passRate}
          />
        </StyledListItem>
        <StyledListItem>
          <ListItemText 
            primary="合格基準"
          />
          <ListItemText 
            primary={props.cert.passMark}
          />
        </StyledListItem>
        <StyledListItem>
          <ListItemText 
            primary="問合せ先"
          />
          <ListItemText 
            primary={props.cert.refOrg}
          />
        </StyledListItem>
        <StyledListItem>
          <ListItemText 
            primary="web"
          />
          <ListItemText>
            <Link
              href={props.cert.refWeb}
              target="_blank"
            >
              {props.cert.refWeb}
            </Link>
          </ListItemText>
        </StyledListItem>
      </List>

    </>
  )
}

export default ExamDataTable;
