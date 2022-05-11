import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const axios = require("axios").default;


export default function Logout() {
    axios.get('/logout')
    return (
        <>
        Logged Out! 
        <Link style={{textDecoration: "none"}} to={'/'}>
              <Button variant="outlined">Return Home</Button>
        </Link>
        </>
    );
}

