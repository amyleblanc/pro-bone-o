import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useRecoilState } from "recoil";
import userState from "./atoms";

const axios = require("axios").default;


export default function Logout() {

const [user, setUser] = useRecoilState(userState);

setUser('')
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

