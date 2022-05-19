import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useRecoilState } from "recoil";
import userState from '../atoms';
import { elementAcceptingRef } from '@mui/utils';


const axios = require("axios").default;


const ITEM_HEIGHT = 30;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      bgcolor: 'pink',
      borderRadius: 5,
      backgroundColor: "#32a85c",
      color: '#ffffff'
    },
  },
};

const names = [
  'Rhys Wood',
  'Amy McCarthy',
  'Bryson Best',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect() {
    const theme = useTheme() 
  const [personName, setPersonName] = React.useState([]);
  const [user, setUser] = useRecoilState(userState);

  const handleSubmit = (event, id) => {
    event.preventDefault();
    const getUser = async () => {
      const res = await axios.get(`/login/${id}`);
      console.log(res.data);
      setUser(res.data);
    };
    getUser();
    console.log(user);
  };

  const [id, setID] = React.useState("");
  const handleChange = (event) => {
    setID(event.target.value);
  };

  return (
    <div>
      <FormControl fullWidth size="small" sx={{ m: 1}} >
        <InputLabel id="demo-multiple-name-label" sx={{color: 'white', fontWeight: 'medium',}}> LOGIN </InputLabel>
        <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            disableUnderline
            variant="filled"
            sx={{
            width: 100,
            height: 40,
            border: "1px solid darkgrey",
            borderRadius: 35,
            backgroundColor: "#32a85c",
            color: "#ffffff",
            
            "& .MuiSvgIcon-root": {
                color: "white",
            },
            }}
          multiple
          value={personName}
          onChange={handleChange}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
              onClick={event => handleChange(event, name.id)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}