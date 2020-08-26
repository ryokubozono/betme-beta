import React, { useContext, useState, useEffect } from 'react';
import { Link, Table, TableCell, TableBody, TableRow } from "@material-ui/core";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import AppLayout from 'components/commons/layout/AppLayout';
import { Box } from "@material-ui/core";

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

const Commercial = (props) => {

  const classes = useStyles();

  return (
    <>
      <AppLayout>
        <Box bgcolor='white' p={2} m={0}>
          <b>
            特定商取引法に基づく表示
          </b>
          <br />
          <br />
          <Table>
            <TableBody className={classes.tableBody}>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableHeader}>
                事業者名
                </TableCell>
                <TableCell className={classes.tableCell}>
                Signal & Company株式会社
                </TableCell>
              </TableRow>

              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableHeader}>
                住所
                </TableCell>
                <TableCell className={classes.tableCell}>
                〒105-0013 東京都港区浜松町２丁目２番１５号　浜松町ダイヤビル２Ｆ
                </TableCell>
              </TableRow>

              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableHeader}>
                連絡先
                </TableCell>
                <TableCell className={classes.tableCell}>
                support@betme.biz
                </TableCell>
              </TableRow>

              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableHeader}>
                代表者
                </TableCell>
                <TableCell className={classes.tableCell}>
                代表取締役社長  福島 涼
                </TableCell>
              </TableRow>

              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableHeader}>
                料金
                </TableCell>
                <TableCell className={classes.tableCell}>
                当サイト上で表示している有料サービス利用額
                </TableCell>
              </TableRow>

              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableHeader}>
                サービス料金以外の必要料金
                </TableCell>
                <TableCell className={classes.tableCell}>
                サービスを利用するためのデータ利用等の通信料、電気料金、その他電気通信回線を利用するために必要な料金につきましては、ユーザー様のご負担となります。
                </TableCell>
              </TableRow>

              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableHeader}>
                決済手段
                </TableCell>
                <TableCell className={classes.tableCell}>
                クレジットカード決済と、Paypalでの決済をご利用いただけます。
                </TableCell>
              </TableRow>

              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableHeader}>
                サービス開始時期
                </TableCell>
                <TableCell className={classes.tableCell}>
                有料サービスにつきましては、サービス登録後すぐにご利用いただけます。
                </TableCell>
              </TableRow>

              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableHeader}>
                キャンセルについて
                </TableCell>
                <TableCell className={classes.tableCell}>
                サービスの性質上、キャンセルはお受けいたしかねます。
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </AppLayout>
    </>
  )
}

export default Commercial;