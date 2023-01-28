import React from 'react';
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

const SearchBox = (props) =>{
    return(
        
                  <Input
                    type='search'
                    id="input-with-icon-adornment"
                    className='search'
                    placeholder={props.placeholder}
                    onChange = {props.handleChange}
                    startAdornment={
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    }
                  />
    )
}

export default SearchBox;