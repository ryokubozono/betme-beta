import React, { useState, useContext, useEffect } from "react";
import { Box, TextField, Button, Grid } from "@material-ui/core";
import AutoComplete from '@material-ui/lab/Autocomplete';
import indigo from '@material-ui/core/colors/indigo';
import { withStyles } from "@material-ui/styles";
import Spacer from "components/commons/atoms/Spacer";
import { CertsContext } from "hooks/Certs";
import CertCard from 'components/commons/card/CertCard';
import { categories } from 'components/commons/consts/categories';
import { makeStyles } from '@material-ui/core/styles';

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(indigo[700]),
    backgroundColor: indigo[800],
    '&:hover': {
      backgroundColor: indigo[900],
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  certCard: {

  },
}));

const SearchItem = (props) => {
  const [searchWord, setSearchWord] = useState('');
  const [category, setCategory] = useState([]);
  const { certs } = useContext(CertsContext); 
  const [searchedCerts, setSearchedCerts] = useState(certs);
  const classes = useStyles();

  const handleChange = (event) => {
    switch (event.target.name) {
      case 'searchWord':
        setSearchWord(event.target.value);
        break;
      default:
        console.log('key not found');
    }
  };

  const handleSerach = () => {
    let tmpCerts = certs;
    
    tmpCerts = tmpCerts.filter(row => {
      if (row.isDisable) {
        return false;
      } else {
        return row;
      }
    })

    if (category.length) {
      tmpCerts = tmpCerts.filter(row => {
        let frag = false;
        category.forEach(col => {
          if ((row.category).indexOf(col.title) !== -1) {
            frag = true;
          }
        })
        if (frag) {
          return row;
        } else {
          return false;
        }
      })
    }
    if (searchWord) {
      tmpCerts = tmpCerts.filter(row => {
        if ((row.name+row.note).indexOf(searchWord) !== -1) {
          return row
        } else {
          return false
        }
      })
    }
    tmpCerts.sort(function(a,b){
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
    });
    setSearchedCerts(tmpCerts)
  }

  useEffect(() => {
    let tmpCerts = certs;
    tmpCerts = tmpCerts.filter(row => {
      if (row.isDisable) {
        return false;
      } else {
        return row;
      }
    })
    tmpCerts.sort(function(a,b){
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
    });
    setSearchedCerts(tmpCerts)
  }, [certs])

  return (
    <>
      <Box bgcolor='white' p={2} m={0}>
        <div>
          ?????????????????????
        </div>
        <Spacer />
        { !true &&
        <>
          <AutoComplete
            name='category'
            id="category"
            multiple
            options={categories.sort((a, b) => -b.group.localeCompare(a.group))}
            groupBy={(option) => option.group}
            getOptionLabel={(option) => option.title}
            style={{ width: 250 }}
            onChange={(event, newValue) => {
              setCategory(newValue);
            }}
            renderInput={(params) => 
              <TextField 
                {...params} 
                label="???????????????" 
              />
            }
          />
          <TextField
            id="searchWord" 
            name='searchWord'
            label="???????????????" 
            style={{ width: 250 }}
            onChange={handleChange} 
            value={searchWord} 
          />
          <Spacer />
          <ColorButton
            variant="contained"
            fullWidth
            onClick={handleSerach}
          >
            ????????????
          </ColorButton>

          <Spacer />
        </>
        }
        <Grid container spacing={3}>
          {searchedCerts.map(cert => (
            <Grid item xs={12} sm={6} className={classes.certCard} >
              <CertCard cert={cert} />
            </Grid>
          ))}
        </Grid>
      
      </Box>

    </>
  )
}

export default SearchItem;
