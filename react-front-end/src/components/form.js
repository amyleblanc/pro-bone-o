import React, { useEffect, useState, useReducer } from "react";
//const axios = require("axios").default;
import TextField from "@mui/material/TextField";

import { LocalizationProvider } from "@mui/x-date-pickers";

import { DateTimePicker } from "@mui/x-date-pickers";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const formReducer = (state, event) => {
  if (event.reset) {
    return {
      type: "",
      pet: [],
      activity: "",
      start: "",
      end: "",
      "gift-wrap": false,
      pets: [],
    };
  }
  return {
    ...state,
    [event.name]: event.value,
  };
};

const START_TIME = "start";
const END_TIME = "end";
const names = ["bobby", "rangers"];
const PETS = [];

export default function ListingForm() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [startValue, setStartValue] = React.useState(new Date());
  const [endValue, setEndValue] = React.useState(new Date());

  const theme = useTheme();
  const [pets, setPets] = React.useState([]);

  // const handleChange = (event) => {
  //   console.log(event.type);
  //   const {
  //     target: { value },
  //   } = event;
  //   setPersonName(
  //     // On autofill we get a stringified value.
  //     typeof value === "string" ? value.split(",") : value
  //   );
  // };

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
    console.log(formData);

    setTimeout(() => {
      setSubmitting(false);
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

  const handlePets = (event) => {
    const {
      target: { value },
    } = event;
    setPets(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    console.log(value);
    handleChange({ target: { name: "pets", value: value } });
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
          <div>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={pets}
                onChange={handlePets}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, pets, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
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
