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

const GyoseiAbout = (props) => {

  const classes = useStyles();

  return (
    <>
      <ListItem className={classes.nested1}>
        <ListItemText
          className={classes.title}
          primary={
            <Typography
              component='h3'
            >
              どんな資格か
            </Typography>
          }
        />
      </ListItem>
      <ListItem className={classes.nested3}>
      行政に関する書類の作成や手続を企業や個人の代わりに行ったり、手続に関するコンサルティング業務を行ったりすることができるようになる資格です。
      </ListItem>

      <ListItem className={classes.nested1}>
        <ListItemText
          className={classes.title}
          primary={
            <Typography
              component='h3'
            >
              資格の魅力・取得メリット
            </Typography>
          }
        />
      </ListItem>
      <ListItem className={classes.nested2}>
        <CheckIcon fontSize='small' color='primary' />
        <ListItemText
          className={classes.fontColorRed}
          primary={
            <Typography
              component='h4'
            >
              誰でも受験できる価値ある国家資格
            </Typography>
          }
        />
      </ListItem>
      <ListItem className={classes.nested3}>
      受験制限がなく、年齢学歴実務経験問わず誰もが受験することができます。また、弁護士・司法書士・税理士・公認会計士・社会保険労務士などと同じ「士業」として、独占業務が認められている価値ある国家資格です。
      </ListItem>
      
      <ListItem className={classes.nested2}>
        <CheckIcon fontSize='small' color="primary" />
        <ListItemText
          className={classes.fontColorRed}
          primary={
            <Typography
              component='h4'
            >
              法律のプロフェッショナルとして、幅広い分野で活躍できる。
            </Typography>
          }
        />
      </ListItem>
      <ListItem className={classes.nested3}>
      行政書士の業務範囲は幅広く、遺言や契約書などの個人の暮らしにまつわる業務や、会社設立や許認可申請などのビジネスにまつわる業務など、その活躍の分野は多岐にわたります。
      </ListItem>  

      <ListItem className={classes.nested2}>
        <CheckIcon fontSize='small' color="primary" />
        <ListItemText
          className={classes.fontColorRed}
          primary={
            <Typography
              component='h4'
            >
              就職・転職・独立等のステップアップに有効
            </Typography>
          }
        />
      </ListItem>
      <ListItem className={classes.nested3}>
      様々なキャリアフィールドが用意されているといえるでしょう。法律や書類作成のプロとして、企業の法務部門や総務部門からの高いニーズが存在します。また、なんといっても行政書士の魅力は独立開業が可能なことです。高い専門性を活かして、雇用にとらわれず自分の力を発揮することもできます。
      </ListItem> 

      <ListItem className={classes.nested1}>
        <ListItemText
          className={classes.title}
          primary={
            <Typography
              component='h3' 
            >
              将来性・活躍シーン
            </Typography>
          }
        />
      </ListItem>
      <ListItem className={classes.nested2}>
        <CheckIcon fontSize='small' color="primary" />
        <ListItemText
          className={classes.fontColorRed}
          primary={
            <Typography
              component='h4'
            >
              将来性
            </Typography>
          }
        />
      </ListItem>
      <ListItem className={classes.nested3}>
      人々の社会生活を支える根幹である「法律」に関する資格であり、これからの社会においても重宝されるスキルが身につくと考えられます。また、他資格へのステップアップもオススメです。宅建士・公務員試験・司法書士等の試験・資格は、行政書士試験と一部試験科目が重なっていますので、行政書士試験で勉強した知識を活かすことができます。
      </ListItem> 

      <ListItem className={classes.nested2}>
        <CheckIcon fontSize='small' color="primary" />
        <ListItemText
          className={classes.fontColorRed}
          primary={
            <Typography
              component='h4'
            >
              活躍シーン
            </Typography>
          }
        />
      </ListItem>

      <ListItem className={classes.nested2}>
        <ListItemText
          className={classes.subTitle}
          primary={
            <Typography
              component='h5'
            >
              個人の暮らしを支える
            </Typography>
          }
        />
      </ListItem> 
      <ListItem className={classes.nested3}>
        ・遺言・相続
      </ListItem> 
      <ListItem className={classes.nested3}>
        ・契約書関係
      </ListItem> 
      <ListItem className={classes.nested3}>
        ・成年後見
      </ListItem>
      <ListItem className={classes.nested3}>
        ・その他（民亊法務、車庫証明など）
      </ListItem>
      <ListItem className={classes.nested2}>
        <ListItemText
          className={classes.subTitle}
          primary={
            <Typography
              component='h5'
            >
              ビジネスを支える
            </Typography>
          }
        />
      </ListItem>
      <ListItem className={classes.nested3}>
        ・会社設立
      </ListItem>
      <ListItem className={classes.nested3}>
        ・許認可申請
      </ListItem>
      <ListItem className={classes.nested3}>
        ・各種書類作成代行
      </ListItem>
      <ListItem className={classes.nested3}>
        ・その他（法務コンサルティング、著作権登録など）
      </ListItem>
    </>
  )
}

export default GyoseiAbout;
