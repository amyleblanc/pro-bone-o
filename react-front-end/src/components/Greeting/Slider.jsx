import React from 'react';
import Switch from '@mui/material/Switch';
import { useRecoilState } from "recoil";
import userState from "../atoms";
const axios = require("axios").default;

const label = { inputProps: { 'aria-label': 'Switch demo' } };


function LoginSlider() {
    const [user, setUser] = useRecoilState(userState);
    const [checked, setChecked] = React.useState(false);

    const handleChange = (event) => {
        if (checked === true){
            setChecked(false);
            setUser('');
            return
        }
        event.preventDefault();
        setChecked(event.target.checked);
        const getUser = async () => {
          const res = await axios.get(`/login/1`);
          console.log(res.data);
          setUser(res.data);
        };
        getUser();
        console.log(user);
      };
    return ( 
        <Switch
        checked={checked}
        onChange={handleChange}
        color="warning"
        inputProps={{ 'aria-label': 'controlled' }}
        />
    );
}

export default LoginSlider;