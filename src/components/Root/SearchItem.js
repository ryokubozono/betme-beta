import React, { useState } from "react";
import { Box, TextField, Button } from "@material-ui/core";
import AutoComplete from '@material-ui/lab/Autocomplete';
import indigo from '@material-ui/core/colors/indigo';
import { withStyles } from "@material-ui/styles";
import Spacer from "components/commons/atoms/Spacer";


const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(indigo[700]),
    backgroundColor: indigo[800],
    '&:hover': {
      backgroundColor: indigo[900],
    },
  },
}))(Button);

const SearchItem = (props) => {
  const [searchWord, setSearchWord] = useState('');
  const [category, setCategory] = useState('');

  const handleChange = (event) => {
    switch (event.target.name) {
      case 'searchWord':
        setSearchWord(event.target.value);
        break;
      default:
        console.log('key not found');
    }
  };

  return (
    <>
      <Box bgcolor='white' p={2} m={0}>
        <div>
          資格試験を探す
        </div>
        <Spacer />
        <AutoComplete
          name='category'
          id="category"
          options={categories}
          getOptionLabel={(option) => option.title}
          style={{ width: 200 }}
          onChange={(event, newValue) => {
            setCategory(newValue && newValue.title);
          }}
          renderInput={(params) => 
            <TextField 
              {...params} 
              label="カテゴリー" 
            />
          }
        />
        <TextField
          id="searchWord" 
          name='searchWord'
          label="キーワード" 
          onChange={handleChange} 
          value={searchWord} 
        />
        <Spacer />
        <ColorButton
          variant="contained"
          fullWidth
        >
          検索する
        </ColorButton>
      </Box>

    </>
  )
}

export default SearchItem;

const categories = [
  { title: 'test1' },
  { title: 'test2' },
  { title: 'test3' },
]