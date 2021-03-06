import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material/";

import { useRecoilState } from "recoil";
import userState from "./atoms";
import "./Login.css";
const axios = require("axios").default;

export default function Login() {
  const [user, setUser] = useRecoilState(userState);

  const handleSubmit = (event) => {
    event.preventDefault();
    const getUser = async () => {
      const res = await axios.get(`${process.env.REACT_APP_host}/login/${id}`);
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
    <div className="login">
      <Typography variant="h5" align="center" color="textSecondary" paragraph>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-name"
            label="User ID"
            value={id}
            onChange={handleChange}
          />
        </Box>
        <button
          type="submit"
          style={{ display: "inline-flex", justifyContent: "space-between" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
