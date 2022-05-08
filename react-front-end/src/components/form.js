import React, { useEffect, useState, useReducer } from "react";
//const axios = require("axios").default;
// import DateTimePicker from "@mui/x-date-pickers/DateTimePicker";
// import TextField from "@mui/material/TextField";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import LocalizationProvider from "@mui/lab";

const formReducer = (state, event) => {
  if (event.reset) {
    return {
      pet: "",
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

export default function ListingForm() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [value, setValue] = (useState < Date) | (null > new Date());
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
    console.log(event);
    setFormData({
      name: event.target.name,
      value: isCheckbox ? event.target.checked : event.target.value,
    });
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
            <p>Select Pet(s)</p>
            <select
              name="pet"
              onChange={handleChange}
              value={formData.pet || ""}
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
              <option value="walkies">Walk</option>
              <option value="sitting">Sitting</option>
              <option value="doggy-date">Doggy Date</option>
            </select>
          </label>
        </fieldset>
        <fieldset disabled={submitting}>
          <label>
            <p>Start Time</p>
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="DateTimePicker"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
              />
            </LocalizationProvider> */}

            {/* id="start-date"
              name="start-time"
              onChange={handleChange} */}
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
              hidden={formData.apple !== "fuji"}
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
