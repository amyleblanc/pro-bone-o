import React, { useState, useReducer } from "react";
import axiosRequest from "../helper/axios";
import { useRecoilValue, useRecoilState } from "recoil";
import { Grid, Box, Button, FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';
import userState from "../components/atoms";
import axios from "axios";
import { border } from "@mui/system";
import './Logout.css'

const formReducer = (state, event) => {
  if (event.reset) {
    return {
      first_name: "",
      last_name: "",
      password: "",
      verified: "",
      email_address: "",
      postal_code: "",
      photo_url: "",
      phone_number: "",
      is_dog_owner: false,
    };
  }
  return {
    ...state,
    [event.name]: event.value,
  };
};

const registerNewUser = async (formData) => {
  const processedForm = formData;
  delete processedForm["verified"];
  axiosRequest(`/api/user/register`, "POST", processedForm);
};

const getLoggedIn = async (formData) => {
  const processedForm = formData;
  delete processedForm["verified"];
  axiosRequest(`/api/user/register`, "GET", processedForm);
};

//still need to add styling to image as well
export default function RegisterUser() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);
  const [userPic, setUserPic] = useState("");
  const [error, setError] = useState(false);
  //const user = useRecoilValue(userState);
  const [user, setUser] = useRecoilState(userState);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.password !== formData.verified) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
      return;
    }

    const getUser = async (id) => {
      const res = await axios.get(`/login/${id}`);
      console.log(res.data);
      setUser(res.data);
    };

    registerNewUser(formData).then(() => {
      getLoggedIn(formData).then((userinfo) => {
        console.log("this is user info", userinfo);
        getUser(userinfo.id);
      });
    }); //getUser(userinfo.id));
    setSubmitting(true);
    console.log(formData);
    setTimeout(() => {
      setSubmitting(false);
      setFormData({ reset: true });
    }, 3000);
  };

  const handleChange = (event) => {
    const isCheckbox = event.target.type === "checkbox";
    setFormData({
      name: event.target.name,
      value: isCheckbox ? event.target.checked : event.target.value,
    });
    if (event.target.name === "photo_url") {
      const url = event.target.value.toString().toLowerCase();
      setUserPic(url);
    }
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      border={0}
      s>

      <Box component="form"
        sx={{
          maxWidth: 600,
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off">
        <h1>New User Registration</h1>
        {submitting && (
          <div>
            You are submitting the following:
            <ul>
              {Object.entries(formData).map(([name, value]) => (
                <li key={name}>
                  <strong>{name}</strong>:{value.toString()}
                </li>
              ))}
            </ul>
          </div>
        )}
        {user.id && <h2>You are Already Logged In.</h2>}
        {!user.id && (
          <FormControl onSubmit={handleSubmit} disabled={submitting} className="no-outline">
            <fieldset disabled={submitting}>
              <TextField
                type="text"
                maxLength={249}
                name="first_name"
                onChange={handleChange}
                placeholder="First Name"
                value={formData.first_name || ""}
                required
              />
              <TextField
                type="text"
                maxLength={249}
                name="last_name"
                onChange={handleChange}
                placeholder="Last Name"
                value={formData.last_name || ""}
                required
              />
              <TextField
                type="text"
                maxLength={249}
                name="email_address"
                onChange={handleChange}
                placeholder="Email Address"
                value={formData.email_address || ""}
                required
              />
              <TextField
                type="text"
                maxLength={6}
                name="postal_code"
                onChange={handleChange}
                placeholder="Ex. V3J8C4"
                value={formData.postal_code || ""}
                required
              />

              <TextField
                type="text"
                maxLength={11}
                name="phone_number"
                onChange={handleChange}
                placeholder="Phone number: 5557891234"
                value={formData.phone_number || ""}
                required
              />
              {userPic && (
                <div id="user-photo">
                  <img
                    src={formData.photo_url ? formData.photo_url : userPic}
                    alt="user"
                  ></img>
                </div>
              )}
              <TextField
                type="url"
                maxLength={499}
                pattern="https://.*"
                name="photo_url"
                onChange={handleChange}
                placeholder="What image would you like to use for the pet?"
                value={formData.photo_url || ""}
              />
              {/* <label>
            <p>Please provide a small description of yourself!</p>
            <TextField
              type="text"
              maxLength={499}
              name="description"
              onChange={handleChange}
              placeholder="Let everyone know what makes you special!"
              value={formData.description || ""}
            />
          </label> */}


              {error && <p>Error! Please confirm your passwords match!</p>}
              <TextField
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
                pattern="^\S{6,}$"
                placeholder="Password (min 6 char)"
                value={formData.password || ""}
                required
              />
              <TextField
                id="password_two"
                name="verified"
                type="password"
                onChange={handleChange}
                pattern="^\S{6,}$"
                placeholder="Verify Password"
                value={formData.verified || ""}
                required
              />
              <p>Are you a pet owner?</p>
              <TextField
                type="checkbox"
                name="is_dog_owner"
                onChange={handleChange}
                value={formData.is_dog_owner || false}
              />
            </fieldset>
            <Button type="submit" disabled={submitting} sx={{ mb: "30px" }}>
              Submit
            </Button>
          </FormControl>
        )}
      </Box>
    </Grid>
  );
}
