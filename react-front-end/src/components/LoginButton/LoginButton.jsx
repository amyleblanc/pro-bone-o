import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useRecoilState } from "recoil";
import userState from '../atoms';
import Button from "@mui/material/Button";
import { border } from '@mui/system';

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
    const theme = useTheme({
        components: {
            MuiOutlinedInput: {
                styleOverrides:{
                    root: {
                        backgroundColor:'#fhwy',
                    }
                }
            }
        }
      }) 
  const [personName, setPersonName] = React.useState([]);
  const [user, setUser] = useRecoilState(userState);

  const handleSubmit = (event) => {
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
      <FormControl   alignItems="center" sx={{ m: 1, width: 100}} >
        <InputLabel id="demo-multiple-name-label"> Login </InputLabel>
        <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            disableUnderline
            variant="filled"
            sx={{
            width: 100,
            height: 40,
            marginRight: 15,
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
              onClick={handleSubmit}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}