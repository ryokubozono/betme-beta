import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import NoImage from 'assets/no_image.jpg';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles({
  root: {
    maxWidth: 288,
    height: 250,
  },
  container: {
  },
  media: {
    height: 100,
  },
});

const CertCard = (props) => {

  const classes = useStyles();
  const history = useHistory();

  return (
    <>
    <Card
      className={classes.root}    
    >
      <CardActionArea
        className={classes.container}
        onClick={() => history.push(`cert/detail/${props.cert.docId}`)}
      >
        <CardMedia
          className={classes.media}
          image={NoImage}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {props.cert.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.cert.note}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </>
  )
}

export default CertCard;
