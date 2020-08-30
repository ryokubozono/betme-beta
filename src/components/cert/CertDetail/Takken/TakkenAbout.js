import React from "react";
import Typography from '@material-ui/core/Typography';
import Brightness1 from '@material-ui/icons/Brightness1';
import CheckIcon from '@material-ui/icons/Check';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested1: {
    paddingLeft: theme.spacing(0),
    fontWeight: 'bolder',
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
    margin: theme.spacing(1),
    borderLeft: '4px solid #E60114', 
    fontWeight: 'bold',
  },
  subTitle: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    fontWeight: 'bolder',
    backgroundColor: '#ffffcc',
  },
  fontColorRed: {
    color: '#E60114',
  },
}));

const TakkenAbout = (props) => {

  const classes = useStyles();

  return (
    <>
      <ListItem className={classes.nested1}>
        <ListItemText
          className={classes.title}
          primary="
            どんな資格か
          "
        />
      </ListItem>
      <ListItem className={classes.nested3}>
        不動産取におけるプロフェッショナルとして、専門知識を有していないお客様に、独占業務となる詳しい說明をすることができるようになる資格です。
      </ListItem>

      <ListItem className={classes.nested1}>
        <ListItemText
          className={classes.title}
          primary="
            資格の魅力・取得メリット
          "
        />
      </ListItem>
      <ListItem className={classes.nested2}>
        <CheckIcon fontSize='small' color='primary' />
        <ListItemText
          className={classes.fontColorRed}
          primary="
            誰でも受験できる価値ある国家資格
          "
        />
      </ListItem>
      <ListItem className={classes.nested3}>
        受験制限がなく、年齢学歴実務経験問わず誰もが受験することができます。また、弁護士・司法書士・税理士・公認会計士・行政書士・社会保険労務士などと同じ「士業」として、独占業務が認められている価値ある国家資格です。
      </ListItem>
      
      <ListItem className={classes.nested2}>
        <CheckIcon fontSize='small' color="primary" />
        <ListItemText
          className={classes.fontColorRed}
          primary="
            不動産取引のプロとして認められる
          "
        />
      </ListItem>
      <ListItem className={classes.nested3}>
      不動産業界では、従業員5人に1人以上の宅地建物取引士(宅建士)を置くことが、法律で義務づけられています。宅建士は、不動産の売買・交換・貸借の代理・仲介(媒介)などの場面において、プロフェッショナルとして価値を発揮します。
      </ListItem>  

      <ListItem className={classes.nested2}>
        <CheckIcon fontSize='small' color="primary" />
        <ListItemText
          className={classes.fontColorRed}
          primary="
            就職・転職・独立等のステップアップに有効
          "
        />
      </ListItem>
      <ListItem className={classes.nested3}>
      不動産業界を中心に企業からのニーズが高い人材となることができます。また、要件を満たせば宅建士の資格を武器に独立開業することも可能です。
      </ListItem> 

      <ListItem className={classes.nested1}>
        <ListItemText
          className={classes.title}
          primary="
          将来性・活躍シーン
          "
        />
      </ListItem>
      <ListItem className={classes.nested2}>
        <CheckIcon fontSize='small' color="primary" />
        <ListItemText
          className={classes.fontColorRed}
          primary="
          将来性
          "
        />
      </ListItem>
      <ListItem className={classes.nested3}>
      人々の生活、「衣・食・住」における「住」を扱う資格となり、今後も活躍の場は広がっていくものと考えられています。また、他資格へのステップアップもオススメです。不動産鑑定士、司法書士、行政書士、マンション管理士等の資格は、宅建士試験と一部試験科目が重なっていますので、宅建士で勉強した知識を活かすことができます。
      </ListItem> 

      <ListItem className={classes.nested2}>
        <CheckIcon fontSize='small' color="primary" />
        <ListItemText
          className={classes.fontColorRed}
          primary="
          活躍シーン
          "
        />
      </ListItem>

      <ListItem className={classes.nested2}>
        <ListItemText
          className={classes.subTitle}
          primary="
            不動産業界
          "
        />
      </ListItem> 
      <ListItem className={classes.nested3}>
      活躍シーンにおける筆頭業界となります。不動産の売買・交換・貸借の代理・仲介などの業務では、宅建士の知識が必要不可欠です。不動産取引で契約を締結する際の重要事項の説明などは、独占業務となり、宅建士以外の人は行うことができません。そのため、不動産業界に従事する方は自ずと求められる資格となります。
      </ListItem> 
      <ListItem className={classes.nested2}>
        <ListItemText
          className={classes.subTitle}
          primary="
          金融業界
          "
        />
      </ListItem> 
      <ListItem className={classes.nested3}>
      不動産を担保として融資する際の物件評価をはじめ、法律・税金・その他の宅建士の知識は日常業務のなかで頻繁に要求されています。他にも、信託銀行の主業務の一つに不動産業務があること、貸金業法の改正で不動産の仲介を活用した不動産担保ローンの取り扱い増加等、数多く活躍シーンがあります。
      </ListItem> 
      <ListItem className={classes.nested2}>
        <ListItemText
          className={classes.subTitle}
          primary="
          その他一般企業
          "
        />
      </ListItem> 
      <ListItem className={classes.nested3}>
      工場用地の取得や新規店舗計画をはじめ、自社が所有している不動産の有効利用等総務系の実務においても、宅建士の知識は役立ちます。このように一般の企業でも、宅建士の活躍の場は広がっています。
      </ListItem> 
      <ListItem className={classes.nested2}>
        <ListItemText
          className={classes.subTitle}
          primary="
          独立開業、不動産投資など
          "
        />
      </ListItem>
      <ListItem className={classes.nested3}>
      資格を活かした独立開業も可能です。また本業の傍ら不動産投資を行いたい方にとっても、宅建士の知識は役立つと言えるでしょう。
      </ListItem> 
    </>
  )
}

export default TakkenAbout;
