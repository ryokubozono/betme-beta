import React, { useState, useContext, useEffect } from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Link, Table, TableCell, TableBody, TableRow, Typography } from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ExamsContext } from "hooks/Exams";
import GetYearMonthDate from 'components/commons/atoms/GetYearMonthDate';
import Spacer from "components/commons/atoms/Spacer";


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
  title: {
    backgroundColor: '#ffd7db',
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    // margin: theme.spacing(1),
    borderLeft: '4px solid #E60114', 
    fontWeight: 'bold',
  },
  tableCell: {
    borderRight: '1px solid #000',
    borderBottom: '1px solid #000',
    margin: '0px',
    textAlign: 'left',
    padding: '0px',
  },
  tableHeaderCell: {
    borderRight: '1px solid #000',
    borderBottom: '1px solid #000',
    margin: '0px',
    textAlign: 'left',
    fontWeight: 'bold',
    padding: '0px',
  },
  tableHeader: {
    borderRight: '1px solid #000',
    borderBottom: '1px solid #000',
    margin: '0px',
    textAlign: 'left',
    minWidth: '120px',
    fontWeight: 'bold',
  },
  tableRow: {
  },
  tableBody: {
    borderTop: '1px solid #000',
    borderLeft: '1px solid #000',
  },
  subTitle: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    fontWeight: 'bolder',
    backgroundColor: '#ffffcc',
  },
  table: {
    maxWidth: '100%',
  },
  nested3Red: {
    paddingLeft: theme.spacing(8),
    color: '#f00',
  },
}));

const GyoseiStudy = (props) => {

  const classes = useStyles();

  return (
    <>
      <List>
        <ListItem>
          <ListItemText
            className={classes.title}
            primary={
              <Typography
                component='h3'
              >
                試験の基本情報
              </Typography>
            }
          />
        </ListItem>
        <ListItem className={classes.nested2}>
          <ListItemText
            className={classes.subTitle}
            primary={
              <Typography
                component='h4'
              >
                試験形式および問題数
              </Typography>
            }
          />
        </ListItem> 
        <ListItem className={classes.nested3}>
          「行政書士の業務に関し必要な法令等科目」<br />
          5肢択一式(40問)/多肢選択式(3問)/記述式(3問) <br />
          「行政書士の業務に関連する一般知識等科目」<br />
          5肢択一式(14問)<br />
          計60問
        </ListItem>
        <ListItem className={classes.nested2}>
          <ListItemText
            className={classes.subTitle}
            primary={
              <Typography
                component='h4'
              >
                配点
              </Typography>
            }
          />
        </ListItem> 
        <ListItem className={classes.nested3}>
        5肢択一式：各4点<br />
    　  多肢選択式：各8点<br />
        記述式：各20点<br />
        合計300点
        </ListItem>
        <ListItem className={classes.nested2}>
          <ListItemText
            className={classes.subTitle}
            primary={
              <Typography
                component='h4'
              >
                合格条件
              </Typography>
            }
          />
        </ListItem> 
        <ListItem className={classes.nested3}>
        下記条件をすべて満たすこと。<br />
        ・行政書士の業務に関し必要な法令等科目の得点が122点以上<br />
        ・行政書士の業務に関連する一般知識等科目の得点が24点以上<br />
        ・試験全体の得点が180点以上<br />
        </ListItem> 
      </List>

      <Table className={classes.table}>
        <TableBody className={classes.tableBody}>
          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableHeaderCell}>
              年度
            </TableCell>
            <TableCell className={classes.tableHeaderCell}>
              受験者数
            </TableCell>
            <TableCell className={classes.tableHeaderCell}>
              合格者数
            </TableCell>
            <TableCell className={classes.tableHeaderCell}>
              合格率
            </TableCell>
          </TableRow>

          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableHeaderCell}>
            平成28年度
            </TableCell>
            <TableCell className={classes.tableCell}>
            41,053人
            </TableCell>
            <TableCell className={classes.tableCell}>
            4,084人
            </TableCell>
            <TableCell className={classes.tableCell}>
            9.95%
            </TableCell>
          </TableRow>

          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableHeaderCell}>
            平成29年度
            </TableCell>
            <TableCell className={classes.tableCell}>
            40,449人
            </TableCell>
            <TableCell className={classes.tableCell}>
            6,360人
            </TableCell>
            <TableCell className={classes.tableCell}>
            15.7%
            </TableCell>
          </TableRow>

          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableHeaderCell}>
            平成30年度
            </TableCell>
            <TableCell className={classes.tableCell}>
            39,105人
            </TableCell>
            <TableCell className={classes.tableCell}>
            4,968人
            </TableCell>
            <TableCell className={classes.tableCell}>
            12.7%
            </TableCell>
          </TableRow>

          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableHeaderCell}>
            令和元年度
            </TableCell>
            <TableCell className={classes.tableCell}>
            39,821人
            </TableCell>
            <TableCell className={classes.tableCell}>
            4,571人
            </TableCell>
            <TableCell className={classes.tableCell}>
            11.5%
            </TableCell>
          </TableRow>

        </TableBody>
      </Table>

      <List>
        <ListItem>
          <ListItemText
            className={classes.title}
            primary={
              <Typography
                component='h3'
              >
                試験範囲、科目、構成等について
              </Typography>
            }
          />
        </ListItem>
        <ListItem className={classes.nested2}>
          <ListItemText
            className={classes.subTitle}
            primary={
              <Typography
                component='h4'
              >
                科目および試験範囲
              </Typography>
            }
          />
        </ListItem> 
        <ListItem className={classes.nested3}>
        「行政書士の業務に関し必要な法令等」<br />
          憲法、行政法（行政法の一般的な法理論、行政手続法、行政不服審査法、行政事件訴訟法、国家賠償法及び地方自治法を中心とする。）、民法、商法及び基礎法学。<br />
          「行政書士の業務に関連する一般知識等」（出題数１４題）<br />
          政治・経済・社会、情報通信・個人情報保護、文章理解
        </ListItem>


        <ListItem className={classes.nested2}>
          <ListItemText
            className={classes.title}
            primary={
              <Typography
                component='h3'
              >
                独学で合格できるか
              </Typography>
            }
          />
        </ListItem> 
        <ListItem className={classes.nested3}>
        市販テキストによる学習で合格を狙うことは十分に可能です。<br />
        今後当ページでも、受験を検討する皆さまをサポートできるようコンテンツ内容の充実に努めていきます。<br />
        引き続きご参照・ご利用いただけますと幸いです。<br />
        </ListItem>

      </List>
    </>
  )
}

export default GyoseiStudy;