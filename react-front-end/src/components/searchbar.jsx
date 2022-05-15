import React, { useState, useReducer, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useTheme } from "@mui/material/styles";
import axiosRequest from "../helper/axios";
import { useRecoilState } from "recoil";
import userState from "./atoms";
import Avatar from "@mui/material/Avatar";
import { atom } from "recoil";
import Switch from "@mui/material/Switch";
import searchState from "./atom-search";
import { Grid } from "@mui/material";

const axios = require("axios").default;

const formReducer = (state, event) => {
  if (event.reset) {
    return {
      type: "Open Requests for Sitter",
      activity: "Anything",
      start: "",
      end: "",
      postal: "",
    };
  }
  return {
    ...state,
    [event.name]: event.value,
  };
};

const START_TIME = "start";
const END_TIME = "end";

const updateSearch = async (formData) => {
  const processedForm = formData;
  axiosRequest("/api/listing/filter", "POST", processedForm);
};

//formats date in local time for backend - if moving globablly would update to render this on the front end instead
const dateFormatter = (date) => {
  //const newDate = date.toISOString();
  const yourDate = new Date();
  const offset = yourDate.getTimezoneOffset();
  const tempDate = date.toDate();
  const modDate = new Date(tempDate.getTime() - offset * 60 * 1000); //.split("T")[0];
  const isoAgain = modDate.toISOString();
  //return newDate;
  return isoAgain;
};

export default function FilterBar() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [startValue, setStartValue] = React.useState(new Date());
  const [endValue, setEndValue] = React.useState(new Date());
  const [user, setUser] = useRecoilState(userState);
  //const theme = useTheme();
  const [pets, setPets] = React.useState([]);
  const [search, setSearch] = useRecoilState(searchState);

  const [submitting, setSubmitting] = useState(false);

  // useEffect(() => {
  //   getUpdatedUser(user.id).then((res) => setUser(res));
  //   axiosRequest(`/login/${userID}`, "GET", {});
  // }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);
    console.log(formData);
    setSearch(formData);
    console.log("this is search data:", search);
    updateSearch(formData).then((res) => {
      console.log(res);
    });
    setTimeout(() => {
      setSubmitting(false);
      setPets([]);
      setFormData({ reset: true });
    }, 3000);
  };

  const handleChange = (event) => {
    const isCheckbox = event.target.type === "checkbox";
    //console.log(event.target.name);
    setFormData({
      name: event.target.name,
      value: isCheckbox ? event.target.checked : event.target.value,
    });
  };

  const handleStartTimeRangePickerChange = (_value) => {
    console.log(_value);
    setStartValue(_value);
    handleChange({ target: { name: START_TIME, value: _value } });
  };

  const handleEndTimeRangePickerChange = (_value) => {
    console.log(_value);
    setEndValue(_value);
    handleChange({ target: { name: END_TIME, value: _value } });
  };

  return (
    <Grid
      container
      // spacing={1}
      direction="column"
      alignItems="center"
      justifyContent="center"
      // columns={{ xs: 4, sm: 8, md: 12 }}
      // className="mainWrap"
      maxWidth="xl"
    >
      <div className="search-bar">
        <h1>Search Bar</h1>
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

        <form onSubmit={handleSubmit} disabled={submitting}>
          <fieldset disabled={submitting}>
            <Grid
              item
              container
              spacing={1}
              direction="row"
              columns={{ xs: 1, sm: 7, md: 7 }}
              // className="mainWrap"
              maxWidth="xl"
            >
              <Grid item>
                <Grid item xs={12} sm={1} md={1}>
                  <label>
                    <span>Type</span>
                    <select
                      name="type"
                      onChange={handleChange}
                      required
                      value={formData.type || ""}
                    >
                      <option value="">--Options--</option>
                      <option value="sitter-request">Available Dogs</option>
                      <option value="sitter-available">
                        Available Sitters
                      </option>
                    </select>
                  </label>
                </Grid>
                <Grid item xs={12} sm={1} md={1}>
                  <label>
                    <span>Activity</span>
                    <select
                      name="activity"
                      onChange={handleChange}
                      required
                      value={formData.activity || ""}
                    >
                      <option value="">--Options--</option>
                      <option value="any-activity">Anything!</option>
                      <option value="walkies">Walk</option>
                      <option value="sitting">Sitting</option>
                      <option value="doggy-date">Doggy Date</option>
                    </select>
                  </label>
                </Grid>
              </Grid>
              <Grid item xs={6} sm={1} md={1}>
                <label>
                  <span>Postal Code</span>
                  <br></br>
                  <input
                    type="text"
                    maxLength={6}
                    name="postal"
                    onChange={handleChange}
                    placeholder="A1B2C3"
                    value={formData.postal || ""}
                  />
                </label>
              </Grid>
              <Grid item xs={12} sm={2} md={2}>
                <label>
                  <span>Start</span>
                  <br></br>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label="DateTimePicker"
                      name={START_TIME}
                      value={startValue}
                      onChange={handleStartTimeRangePickerChange}
                      required
                    />
                  </LocalizationProvider>
                </label>
              </Grid>
              <Grid item xs={12} sm={2} md={2}>
                <label>
                  <span>End</span>
                  <br></br>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label="DateTimePicker"
                      name={END_TIME}
                      value={endValue}
                      onChange={handleEndTimeRangePickerChange}
                      required
                    />
                  </LocalizationProvider>
                </label>
              </Grid>
            </Grid>
          </fieldset>
          <button type="submit" disabled={submitting}>
            Submit
          </button>
        </form>
      </div>
    </Grid>
  );
}
