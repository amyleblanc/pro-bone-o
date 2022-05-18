import userState from "../components/atoms";
import { Grid } from "@mui/material";
import searchState from "../components/atom-search";
import { useRecoilState } from "recoil";
import React, { useState, useReducer, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Listing from "../components/Listing";
import { Button } from "react-scroll/modules";
import Map from "../components/maps/Map";
const axios = require("axios").default;

const formReducer = (state, event) => {
  if (event.reset) {
    return {
      type: "sitter-request",
      activity: "any-activity",
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

export default function AllListings() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [startValue, setStartValue] = React.useState(new Date());
  const [endValue, setEndValue] = React.useState(new Date());
  const [url, setUrl] = React.useState("/api/listing/filter");

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const isCheckbox = event.target.type === "checkbox";
    //console.log(event.target.name);
    setFormData({
      name: event.target.name,
      value: isCheckbox ? event.target.checked : event.target.value,
    });
  };

  const handleReset = () => {
    setFormData({
      name: "type",
      value: "sitter-request",
    });
    setFormData({
      name: "activity",
      value: "any-activity",
    });
    setFormData({
      name: "start",
      value: "",
    });
    setFormData({
      name: "end",
      value: "",
    });
    setFormData({
      name: "postal",
      value: "",
    });
  };

  const handleStartTimeRangePickerChange = (_value) => {
    setStartValue(_value);
    handleChange({ target: { name: START_TIME, value: _value } });
  };

  const handleEndTimeRangePickerChange = (_value) => {
    setEndValue(_value);
    handleChange({ target: { name: END_TIME, value: _value } });
  };

  return (
    <div className="search-listings">
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        maxWidth="xl"
      >
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

        <form disabled={submitting}>
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
                      name={END_TIME}
                      value={endValue}
                      onChange={handleEndTimeRangePickerChange}
                      required
                    />
                  </LocalizationProvider>
                </label>
              </Grid>
              {/* <button disabled={submitting} onClick={handleReset}>
                Reset
              </button> */}
            </Grid>
          </fieldset>
        </form>
      </Grid>
      <Map url={url} payload={formData} />
      <Listing url={url} payload={formData} />
    </div>
  );
}
