import React, { useState, useContext, useEffect } from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Link, Table, TableCell, TableBody, TableRow } from "@material-ui/core";
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

const TakkenSummary = (props) => {

  const classes = useStyles();

  return (
    <>
      <List>
        <ListItem>
          <ListItemText
            className={classes.title}
            primary="
              受験申込みについて
            "
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
              試験案内(受験申込書)は各都道府県ごとに異なります。郵送にて受験申込みをされる場合は試験案内を入手いただく必要があります。また、インターネットにて受験申込みをされる場合は、(一財)不動産適正取引推進機構のホームペ ージに試験案内が掲載されますのでそちらでご確認いただけます。
            </TableCell>
          </TableRow>

          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableHeader}>
              試験案内配布期間
            </TableCell>
            <TableCell className={classes.tableCell}>
              2020年(令和2年)7月1日(水)～7月31日(金)
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
              宅建士試験は、郵送、インターネットのいずれかの方法で申込みができます。それぞれの方法で申込み期間が異なります。
            </TableCell>
          </TableRow>
          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableHeader}>
              インターネット申込
            </TableCell>
            <TableCell className={classes.tableCell}>
              2020年(令和2年)7月1日(水)9時30分～7月15日(水)21時59分
            </TableCell>
          </TableRow>

          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableHeader}>
            　郵送申込
            </TableCell>
            <TableCell className={classes.tableCell}>
              2020年(令和2年)7月1日(水)～7月31日(金)
            </TableCell>
          </TableRow>

        </TableBody>
      </Table>

      <List>
        <ListItem>
          <ListItemText
            className={classes.title}
            primary="
              試験実施日程・概要
            "
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
              宅地建物取引士試験(国家資格)
            </TableCell>
          </TableRow>

          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableHeader}>
              主催団体
            </TableCell>
            <TableCell className={classes.tableCell}>
              国土交通省
            </TableCell>
          </TableRow>

          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableHeader}>
              試験日
            </TableCell>
            <TableCell className={classes.tableCell}>
              2020/10/18
            </TableCell>
          </TableRow>

          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableHeader}>
              試験時間
            </TableCell>
            <TableCell className={classes.tableCell}>
              13:00〜15:00(登録講習修了者は13：10～15：00)
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
              原則として、現在お住まいの試験地(当道府県)
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
            4肢択一のマークシート方式・全50題
            </TableCell>
          </TableRow>

          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableHeader}>
            合格発表日
            </TableCell>
            <TableCell className={classes.tableCell}>
            2020/12/2
            </TableCell>
          </TableRow>

          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableHeader}>
            問い合わせ先
            </TableCell>
            <TableCell className={classes.tableCell}>
              (財)不動産適正取引推進機構
              <Link
                href='http://www.retio.or.jp/'
                target="_blank"
              >
                http://www.retio.or.jp/
              </Link>
            </TableCell>
          </TableRow>

          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableHeader}>
              目安勉強時間(当社調べ)
            </TableCell>
            <TableCell className={classes.tableCell}>
              500時間程度
            </TableCell>
          </TableRow>

        </TableBody>
      </Table>
    </>
  )
}

export default TakkenSummary;