import React, { Component, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import "./Logout.css";


const axios = require("axios").default;


export default function Logout() {
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
          navigate('/')
        }, 1500)
      }, [])

    axios.get('/logout')
    return (
        <div className="logout">
        Logged Out! 
        <div>
            <div>Redirecting to home page...</div>
        <Link style={{textDecoration: "none", padding: "10px"}} to={'/'}>
              <Button variant="outlined">Return Home</Button>
        </Link>
        </div>
        </div>
    );
}

