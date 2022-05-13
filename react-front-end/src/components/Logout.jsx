import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useRecoilState } from "recoil";
import userState from "./atoms";
import "./Logout.css";


const axios = require("axios").default;


export default function Logout() {

const [user, setUser] = useRecoilState(userState);

setUser('')
    axios.get('/logout')
    return (
        <div className="logout">
        Logged Out! 
        <div>
        <Link style={{textDecoration: "none", padding: "10px"}} to={'/'}>
              <Button variant="outlined">Return Home</Button>
        </Link>
        </div>
        </div>
    );
}

