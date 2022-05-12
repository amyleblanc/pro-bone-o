import React from 'react';
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";



function GuestGreeting() {
    return ( 
        <Link style={{ textDecoration: "none" }} to={"Login"}>
            <Button variant="contained" color="success">
                Login
            </Button>
        </Link>
     );
}

export default GuestGreeting;