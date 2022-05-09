import React, { useEffect, useState, useReducer } from "react";
//const axios = require("axios").default;
import TextField from "@mui/material/TextField";

import { LocalizationProvider } from "@mui/x-date-pickers";

import { DateTimePicker } from "@mui/x-date-pickers";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const formReducer = (state, event) => {
  if (event.reset) {
    return {
      type: "",
      pet: [],
      activity: "",
      start: "",
      end: "",
      "gift-wrap": false,
    };
  }
  return {
    ...state,
    [event.name]: event.value,
  };
};

const START_TIME = "start";
const END_TIME = "end";

export default function ListingForm() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [startValue, setStartValue] = React.useState(new Date());
  const [endValue, setEndValue] = React.useState(new Date());
  //const [value, setValue] = (useState < Date) | (null > new Date());
  // const [listing, setListing] = useState([]);

  // useEffect(() => {
  //   const createListing = async () => {
  //     const res = await axios("/api/listing/create");
  //     setListing(res.data);
  //   };
  //   createListing();
  // }, []);

  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setFormData({ reset: true });
    }, 3000);
  };

  const handleChange = (event) => {
    const isCheckbox = event.target.type === "checkbox";
    console.log(event.target);
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
    <div className="create-form">
      <h1>Create a Listing</h1>
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
        <fieldset>
          <label>
            <p>Listing Type</p>
            <select
              name="type"
              onChange={handleChange}
              value={formData.type || ""}
            >
              <option value="">--Please choose an option--</option>
              <option value="sitter-request">Request For Sitter</option>
              <option value="sitter-available">
                Sitter Available for Activities
              </option>
            </select>
          </label>
          <label>
            <p hidden={formData.type !== "sitter-request"}>Select Pet(s)</p>
            <select
              name="pet"
              onChange={handleChange}
              value={formData.pet || []}
              hidden={formData.type !== "sitter-request"}
            >
              <option value="">--Please choose an option--</option>
              <option value="steve">Steve</option>
              <option value="bobby">Bobby</option>
              <option value="john">John</option>
            </select>
          </label>
          <label>
            <p>Select Activity Requested</p>
            <select
              name="activity"
              onChange={handleChange}
              value={formData.activity || ""}
            >
              <option value="">--Please choose an option--</option>
              <option value="any-activity">Anything!</option>
              <option value="walkies">Walk</option>
              <option value="sitting">Sitting</option>
              <option value="doggy-date">Doggy Date</option>
            </select>
          </label>
        </fieldset>
        <fieldset disabled={submitting}>
          <label>
            <p>Start Time</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="DateTimePicker"
                name={START_TIME}
                value={startValue}
                onChange={handleStartTimeRangePickerChange}
              />
            </LocalizationProvider>
          </label>
          <label>
            <p>End Time</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="DateTimePicker"
                name={END_TIME}
                value={endValue}
                onChange={handleEndTimeRangePickerChange}
              />
            </LocalizationProvider>
          </label>
          <label>
            <p>Count</p>
            <input
              type="number"
              name="count"
              onChange={handleChange}
              step="1"
              value={formData.count || ""}
            />
          </label>
          <label>
            <p>Gift Wrap</p>
            <input
              type="checkbox"
              name="gift-wrap"
              onChange={handleChange}
              checked={formData["gift-wrap"] || false}
              hidden={formData.type !== "fuji"}
            />
          </label>
        </fieldset>
        <button type="submit" disabled={submitting}>
          Submit
        </button>
      </form>
    </div>
  );
}
