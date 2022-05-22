import React, { useState, useReducer } from "react";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useTheme } from "@mui/material/styles";
import axiosRequest from "../helper/axios";
import { useRecoilValue } from "recoil";
import userState from "./atoms";
import {
  Grid,
  Box,
  Button,
  FormControl,
  OutlinedInput,
  InputLabel,
  MenuItem,
  Select,
  Chip,
  Avatar,
  Typography,
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
const axios = require("axios").default;

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
      details: "",
      pets: [],
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

const createNewListing = async (formData) => {
  const processedForm = formData;
  axiosRequest(
    `${process.env.REACT_APP_host}/api/listings/create`,
    "POST",
    processedForm
  );
};

// const getUpdatedUser = async (userID) => {
//   axiosRequest(`/login/${userID}`, "GET");
// };

//formats date in local time for backend - if moving globablly would update to render this on the front end instead
const dateFormatter = (date) => {
  const newDate = date.toISOString();
  // const yourDate = new Date();
  // const offset = yourDate.getTimezoneOffset();
  // const tempDate = date.toDate();
  // const modDate = new Date(tempDate.getTime() - offset * 60 * 1000); //.split("T")[0];
  // const isoAgain = modDate.toISOString();
  return newDate;
  //return isoAgain;
};

export default function ListingForm() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [startValue, setStartValue] = React.useState(new Date());
  const [endValue, setEndValue] = React.useState(new Date());
  const user = useRecoilValue(userState);
  const theme = useTheme();
  const [pets, setPets] = React.useState([]);

  const [submitting, setSubmitting] = useState(false);

  // useEffect(() => {
  //   getUpdatedUser(user.id).then((res) => setUser(res));
  //   axiosRequest(`/login/${userID}`, "GET", {});
  // }, []);

  const getPetPhoto = (petName) => {
    let url = "";
    for (let each of user.pets) {
      if (each.name === petName) {
        url = each.photo_url;
      }
    }
    return url;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);
    console.log(formData);
    if (!formData["pets"]) {
      const type = true;
      const newData = {
        activity_type: formData["activity"],
        additional_details: formData["details"] ? formData["details"] : "",
        start_time: dateFormatter(
          formData["start"] ? formData["start"] : new Date()
        ),
        end_time: dateFormatter(formData["end"] ? formData["end"] : new Date()),
        postal_code: formData["postal"],
        sitter_listing: type,
        user_id: user.id,
      };
      createNewListing(newData);
    } else {
      let count = formData["pets"];
      count = count.length;
      for (let i = 0; i < count; i++) {
        let petid = 0;
        for (let each of user.pets) {
          if (each["name"] === formData["pets"][i]) {
            petid = each.id;
          }
        }
        const type = false;
        const newData = {
          activity_type: formData["activity"],
          additional_details: formData["details"] ? formData["details"] : "",
          start_time: dateFormatter(
            formData["start"] ? formData["start"] : new Date()
          ),
          end_time: dateFormatter(
            formData["end"] ? formData["end"] : new Date()
          ),
          postal_code: formData["postal"],
          sitter_listing: type,
          pet_id: petid, //each
          user_id: user.id,
        };
        createNewListing(newData);
      }
    }
    console.log(formData);

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
    <Grid
      container
      spacing={1}
      direction="column"
      alignItems="center"
      justifyContent="center"
      minWidth="400px"
    >
      <Typography variant="h7" align="center" paddingBottom="15px">
        Create a listing to let the<br/>Pro-Bone-O community know<br/>what you are looking for!
      </Typography>
      {submitting && (
        <div>
          You submitted the following:
          <ul>
            {Object.entries(formData).map(([name, value]) => (
              <li key={name}>
                <strong>{name}</strong>:{value.toString()}
              </li>
            ))}
          </ul>
        </div>
      )}
      {!user.id && <h1>Please Login or Register to Access This Page.</h1>}
      {user.id && (
        <form onSubmit={handleSubmit} disabled={submitting} padding="20px">
          <fieldset style={{border: "none"}}>
            <label>
              <p>Listing Type</p>
              <select
                name="type"
                onChange={handleChange}
                required
                value={formData.type || ""}
              >
                <option value="">--Please choose an option--</option>
                {user.pets.length !== 0 && (
                  <option value="sitter-request">Request For Sitter</option>
                )}
                <option value="sitter-available">
                  Sitter Available for Activities
                </option>
              </select>
            </label>
            <div>
              <p hidden={formData.type !== "sitter-request"}>Select Pet(s)</p>
              {formData.type === "sitter-request" && (
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="demo-multiple-chip-label"></InputLabel>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={pets}
                    required
                    onChange={handlePets}
                    input={
                      <OutlinedInput id="select-multiple-chip" label="Chip" />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Avatar
                            alt={getPetPhoto(value)}
                            src={getPetPhoto(value)}
                            sx={{ width: 90, height: 90, margin: 1 }}
                          >
                            <Chip key={value} label={value}></Chip>{" "}
                          </Avatar>
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {user.pets.map((pet) => (
                      <MenuItem
                        key={pet.name}
                        value={pet.name}
                        style={getStyles(pet.name, pets, theme)}
                      >
                        <Avatar alt={pet.name} src={pet.photo_url} sx={{margin: 1, boxShadow: 3}}>
                          {pet.name}
                        </Avatar>
                        {pet.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </div>
            <label>
              <p>Select Activity Requested</p>
              <select
                name="activity"
                onChange={handleChange}
                required
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
          <fieldset disabled={submitting} style={{border: "none"}}>
            <label>
              <p>Start Time</p>
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
            <label>
              <p>End Time</p>
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
            <label>
              <p>Postal Code</p>
              <input
                type="text"
                maxLength={6}
                name="postal"
                onChange={handleChange}
                required
                placeholder="A1B2C3"
                value={formData.postal || ""}
              />
            </label>
            <label>
              <p>Additional Details</p>
              <input
                type="text"
                maxLength={199}
                name="details"
                onChange={handleChange}
                placeholder="Tell us more!"
                value={formData.details || ""}
              />
            </label>
          </fieldset>
          <Button
            variant="contained"
            endIcon={<PetsIcon />}
            type="submit"
            disabled={submitting}
            sx={{
              bgcolor: "#00A8A8",
              borderRadius: "16px",
              marginBottom: "20px",
            }}
          >
            Submit
          </Button>
        </form>
      )}
    </Grid>
  );
}
