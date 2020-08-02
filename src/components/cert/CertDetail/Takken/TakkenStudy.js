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
    backgroundColor: '#ffcccc',
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    // margin: theme.spacing(1),
    borderLeft: '4px solid #ff7fbf', 
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

const TakkenStudy = (props) => {

  const classes = useStyles();

  return (
    <>
      <List>
        <ListItem>
          <ListItemText
            className={classes.title}
            primary="
              試験の基本情報
            "
          />
        </ListItem>
        <ListItem className={classes.nested2}>
          <ListItemText
            className={classes.subTitle}
            primary="
              試験方式
            "
          />
        </ListItem> 
        <ListItem className={classes.nested3}>
          四肢択一のマークシート方式
        </ListItem>
        <ListItem className={classes.nested2}>
          <ListItemText
            className={classes.subTitle}
            primary="
            問題数・配点
            "
          />
        </ListItem> 
        <ListItem className={classes.nested3}>
        全50問。1問あたり1点で、50点満点となっています。
        </ListItem>
        <ListItem className={classes.nested2}>
          <ListItemText
            className={classes.subTitle}
            primary="
            合格条件
            "
          />
        </ListItem> 
        <ListItem className={classes.nested3}>
        合格基準点以上の得点をすること。※受験者のうち成績上位15%から17%あたりまでの層が「合格者」になるよう設定されます。
合格基準点は年度によって変動しますが、直近4年では35点から37点で推移しています。詳細下記参照。
        </ListItem> 
      </List>

      <Table className={classes.table}>
        <TableBody className={classes.tableBody}>
          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableHeaderCell}>
              年度
            </TableCell>
            <TableCell className={classes.tableHeaderCell}>
              申込者数
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
            <TableCell className={classes.tableHeaderCell}>
              合格基準点
            </TableCell>
          </TableRow>

          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableHeaderCell}>
            平成28年度
            </TableCell>
            <TableCell className={classes.tableCell}>
            245,742人
            </TableCell>
            <TableCell className={classes.tableCell}>
            198,463人
            </TableCell>
            <TableCell className={classes.tableCell}>
            30,589人
            </TableCell>
            <TableCell className={classes.tableCell}>
            15.4%
            </TableCell>
            <TableCell className={classes.tableCell}>
            50問中35点
            </TableCell>
          </TableRow>

          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableHeaderCell}>
            平成29年度
            </TableCell>
            <TableCell className={classes.tableCell}>
            258,511人
            </TableCell>
            <TableCell className={classes.tableCell}>
            209,354人
            </TableCell>
            <TableCell className={classes.tableCell}>
            32,644人
            </TableCell>
            <TableCell className={classes.tableCell}>
            15.6%
            </TableCell>
            <TableCell className={classes.tableCell}>
            50問中35点
            </TableCell>
          </TableRow>

          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableHeaderCell}>
            平成30年度
            </TableCell>
            <TableCell className={classes.tableCell}>
            265,444人
            </TableCell>
            <TableCell className={classes.tableCell}>
            213,993人
            </TableCell>
            <TableCell className={classes.tableCell}>
            33,360人
            </TableCell>
            <TableCell className={classes.tableCell}>
            15.6%
            </TableCell>
            <TableCell className={classes.tableCell}>
            50問中37点
            </TableCell>
          </TableRow>

          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableHeaderCell}>
            令和元年度
            </TableCell>
            <TableCell className={classes.tableCell}>
            276,019人
            </TableCell>
            <TableCell className={classes.tableCell}>
            220,797人
            </TableCell>
            <TableCell className={classes.tableCell}>
            37,481人
            </TableCell>
            <TableCell className={classes.tableCell}>
            17.0%
            </TableCell>
            <TableCell className={classes.tableCell}>
            50問中35点
            </TableCell>
          </TableRow>

        </TableBody>
      </Table>

      <List>
        <ListItem>
          <ListItemText
            className={classes.title}
            primary="
              試験範囲、科目、構成等について
            "
          />
        </ListItem>
        <ListItem className={classes.nested2}>
          <ListItemText
            className={classes.subTitle}
            primary="
              試験範囲
            "
          />
        </ListItem> 
        <ListItem className={classes.nested3}>
        宅地建物取引業に関する実用的な知識を有するかどうかを判定することに基準が置かれています。 法令で定められた試験内容は以下の通りです。<br /><br />

        ・土地の形質、地積、地目及び種別並びに建物の形質、構造及び種別に関すること。<br />
        ・土地及び建物についての権利及び権利の変動に関する法令に関すること。<br />
        ・土地及び建物についての法令上の制限に関すること。<br />
        ・宅地及び建物についての税に関する法令に関すること。<br />
        ・宅地及び建物の需給に関する法令及び実務に関すること。<br />
        ・宅地及び建物の価格の評定に関すること。<br />
        ・宅地建物取引業法及び同法の関係法令に関すること。<br />

        </ListItem>

        <ListItem className={classes.nested2}>
          <ListItemText
            className={classes.subTitle}
            primary="
              科目
            "
          />
        </ListItem> 
        <ListItem className={classes.nested3}>
        正式名称による区分ではありませんが、下記４科目から構成されます。<br /><br />

        ・民法等（14問）<br />
        ・宅建業法（20問）<br />
        ・法令上の制限（8問）<br />
        ・税、その他関連知識（8問）<br />
        </ListItem>

        <ListItem className={classes.nested3Red}>
        【ポイント】
        </ListItem>
        <ListItem className={classes.nested3}>
        比重の高い「民法等」と「宅建業法」では苦手を作らないようにしましょう。<br />
        学習時間が限られている方は、理解に時間のかかる民法から学習をスタートし、直前期に宅建業法や法令を集中的にインプットする学習方法がオススメです。<br />
        </ListItem>

        <ListItem className={classes.nested2}>
          <ListItemText
            className={classes.title}
            primary="
            各科目についての說明
            "
          />
        </ListItem> 
        <ListItem className={classes.nested2}>
          <ListItemText
            className={classes.subTitle}
            primary="
            民法等（14問）
            "
          />
        </ListItem> 
        <ListItem className={classes.nested3}>
        10／14点を目標にしましょう。<br />
        民法の中でも意思表示や代理、相続や賃貸借、抵当権などがよく出題されます。<br />
        また、不動産登記法や建物区分所有法、借地借家法等も頻出です。<br />
        民法は非常に幅広く、条文の数も多いため、丸暗記は現実的ではありません。<br />
        法律用語の理解には時間がかかるかもしれませんが、論理構成やロジックを掴めば解ける問題も多くあるため、早期に学習に着手しましょう。<br />
        </ListItem>

        <ListItem className={classes.nested2}>
          <ListItemText
            className={classes.subTitle}
            primary="
            宅建業法（20問）
            "
          />
        </ListItem> 
        <ListItem className={classes.nested3}>
        18／20点を目標にしましょう。<br />
        この科目では、宅建業者や宅建士の仕事上のルールが取り扱われます。数字などの暗記項目が多い反面、理解しやすく点が取りやすいはずです。<br />
        過去問を繰り返し、確実な得点源となるように取り組みましょう。<br />
        頻出分野としては、売買や賃貸の契約書である「37条書面」や、買主や借主が契約前に把握すべき「重要事項説明」、住宅瑕疵担保履行法などです。<br />

        </ListItem>

        <ListItem className={classes.nested2}>
          <ListItemText
            className={classes.subTitle}
            primary="
            法令上の制限（8問）
            "
          />
        </ListItem> 
        <ListItem className={classes.nested3}>
        5／8点を目標にしましょう。<br />
        この科目では、土地や建物を規定するルール、開発行為や役所への届け出などが出題されます。<br />
        具体的には、国土利用計画法、都市計画法、建築基準法、農地法などとなります。<br />
        暗記事項や数字が多いことも「法令上の制限」の特徴となりますが、暗記さえできればこちらも宅建業法と同じく確実な得点源にすることが可能です。<br />
        過去問を繰り返し、得意科目にしましょう。<br />

        </ListItem>
        <ListItem className={classes.nested2}>
          <ListItemText
            className={classes.subTitle}
            primary="
            税、その他関連知識（8問）
            "
          />
        </ListItem> 
        <ListItem className={classes.nested3}>
        5／8点を目標にしましょう。<br />
        税金関係の問題では、不動産取得税、固定資産税、所得税、印紙税、登録免許税、贈与税などが出題されます。<br />
        また、税金以外では主に不動産関連の最近の統計や景品表示法などが出題されます。（宅建試験では第46問から第50問までの部分）<br />
        「暗記」によるアプローチが基本ですが、出題範囲が広いため、頻出問題を中心に取り組みましょう。<br />
        税額計算については、繰り返し練習し、取りこぼさないようにしましょう。<br />
        なお「5問免除制度」を利用する人は、第46問から第50問までの部分が免除になります。<br />

        </ListItem>

        <ListItem className={classes.nested2}>
          <ListItemText
            className={classes.title}
            primary="
            独学で合格できるか
            "
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

export default TakkenStudy;