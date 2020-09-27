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
  },
  tableHeader: {
    borderRight: '1px solid #000',
    borderBottom: '1px solid #000',
    margin: '0px',
    textAlign: 'left',
    minWidth: '120px',
  },
  tableRow: {
  },
  tableBody: {
    borderTop: '1px solid #000',
    borderLeft: '1px solid #000',
  }
}));

const GyoseiSummary = (props) => {

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
                受験申込みについて
              </Typography>
            }
          />
        </ListItem>
      </List>
      <Table>
        <TableBody className={classes.tableBody}>
          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableHeader}>
              試験案内(受験申込書)について
            </TableCell>
            <TableCell className={classes.tableCell}>
            「窓口で受け取る」方法と、「センターに郵便で請求して郵送してもらう」方法の２通りあります。 
            </TableCell>
          </TableRow>

          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableHeader}>
            受験願書配布期間
            </TableCell>
            <TableCell className={classes.tableCell}>
              「窓口で受け取る」場合<br />
              2020年7月27日(月)から8月28日(金)まで<br />
              「センターに郵便で請求して郵送してもらう」場合<br />
              2020年7月6日(月)から8月21日(金)必着
            </TableCell>
          </TableRow>

          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableHeader}>
              試験案内配布場所
            </TableCell>
            <TableCell className={classes.tableCell}>
              試験案内の配布場所は各都道府県の宅地建物取引業協会など、ご受験いただく都道府県によって様々です。詳細は(一財)不動産適正取引推進機構のホームページをご確認ください。
            </TableCell>
          </TableRow>
          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableHeader}>
            申込受付期間
            </TableCell>
            <TableCell className={classes.tableCell}>
            行政書士試験は、郵送、インターネットのいずれかの方法で申込みができます。それぞれの方法で申込み期間が異なります。
            </TableCell>
          </TableRow>
          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableHeader}>
              インターネット申込
            </TableCell>
            <TableCell className={classes.tableCell}>
              2020年7月27日(月)9時 ～8月25日(火)17時
            </TableCell>
          </TableRow>

          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableHeader}>
            　郵送申込
            </TableCell>
            <TableCell className={classes.tableCell}>
            2020年7月27日(月)～8月28日(金)消印有効
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
                試験実施日程・概要
              </Typography>
            }
          />
        </ListItem>
      </List>
      <Table>
        <TableBody className={classes.tableBody}>

          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableHeader}>
              名称
            </TableCell>
            <TableCell className={classes.tableCell}>
            行政書士試験(国家資格)
            </TableCell>
          </TableRow>

          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableHeader}>
              主催団体
            </TableCell>
            <TableCell className={classes.tableCell}>
            一般財団法人行政書士試験研究センター
            </TableCell>
          </TableRow>

          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableHeader}>
              試験日
            </TableCell>
            <TableCell className={classes.tableCell}>
            2020/11/8
            </TableCell>
          </TableRow>

          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableHeader}>
              試験時間
            </TableCell>
            <TableCell className={classes.tableCell}>
            13:00〜16:00
            </TableCell>
          </TableRow>

          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableHeader}>
              受験資格
            </TableCell>
            <TableCell className={classes.tableCell}>
            誰でも受験可能(受験制限なし)
            </TableCell>
          </TableRow>

          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableHeader}>
              受験地
            </TableCell>
            <TableCell className={classes.tableCell}>
            現在のお住まいにかかわらず、全国の試験会場で受験できます。
            </TableCell>
          </TableRow>

          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableHeader}>
              受験料
            </TableCell>
            <TableCell className={classes.tableCell}>
              7,000円
            </TableCell>
          </TableRow>

          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableHeader}>
              試験形式・出題数
            </TableCell>
            <TableCell className={classes.tableCell}>
            5肢択一式/多肢選択式/記述式 計60題
            </TableCell>
          </TableRow>

          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableHeader}>
            合格発表日
            </TableCell>
            <TableCell className={classes.tableCell}>
            2021/1/27
            </TableCell>
          </TableRow>

          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableHeader}>
            問い合わせ先
            </TableCell>
            <TableCell className={classes.tableCell}>
            一般財団法人行政書士試験研究センター
              <Link
                href='https://gyosei-shiken.or.jp/'
                target="_blank"
              >
                https://gyosei-shiken.or.jp/
              </Link>
            </TableCell>
          </TableRow>

          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableHeader}>
              目安勉強時間(当社調べ)
            </TableCell>
            <TableCell className={classes.tableCell}>
            600時間程度
            </TableCell>
          </TableRow>

        </TableBody>
      </Table>
    </>
  )
}

export default GyoseiSummary;