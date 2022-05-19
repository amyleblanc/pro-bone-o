import React from 'react';
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import MultipleSelect from '../LoginButton/LoginButton';



function GuestGreeting() {
    return ( 
        <>
        <MultipleSelect />
        <Link style={{ textDecoration: "none" }} to={"Login"}>
            <Button style={{
                    borderRadius: 35,
                    backgroundColor: "#32a85c",
                }} variant="contained" color="success" sx={{mr: 2}}>
                Login
            </Button>
        </Link>
        <Link style={{ textDecoration: "none" }} to={"registerUser"}>
            <Button style={{
                    borderRadius: 35,
                    backgroundColor: "#21b6ae",
                }} variant="contained" color="error" sx={{mr: 2}}>
                Register
            </Button>
        </Link>        
        </>
     );
}

export default GuestGreeting;