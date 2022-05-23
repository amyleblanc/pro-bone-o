import React, { useState, useReducer } from "react";
import { getSpecificDog } from "../helper/fetchdog";
import axiosRequest from "../helper/axios";
import { useRecoilState } from "recoil";
import userState from "../components/atoms";
import { Button, Grid, Typography } from '@mui/material';
import PetsIcon from "@mui/icons-material/Pets";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// const getSpecificDog = require("../helper/fetchdog");

const dogList = [
  "Affenpinscher",
  "African",
  "Airedale",
  "Akita",
  "Appenzeller",
  "Australian/shepherd",
  "Basenji",
  "Beagle",
  "Bluetick",
  "Borzoi",
  "Bouvier",
  "Boxer",
  "Brabancon",
  "Briard",
  "Buhund/norwegian",
  "Bulldog/boston",
  "Bulldog/english",
  "Bulldog/french",
  "Bullterrier/staffordshire",
  "Cattledog/australian",
  "Chihuahua",
  "Chow",
  "Clumber",
  "Cockapoo",
  "Collie/border",
  "Coonhound",
  "Corgi/cardigan",
  "Cotondetulear",
  "Dachshund",
  "Dalmatian",
  "Dane/great",
  "Deerhound/scottish",
  "Dhole",
  "Dingo",
  "Doberman",
  "Elkhound/norwegian",
  "Entlebucher",
  "Eskimo",
  "Finnish/lapphund",
  "Frise/bichon",
  "Germanshepherd",
  "Greyhound/italian",
  "Groenendael",
  "Havanese",
  "Hound/afghan",
  "Hound/basset",
  "Hound/blood",
  "Hound/english",
  "Hound/ibizan",
  "Hound/plott",
  "Hound/walker",
  "Husky",
  "Keeshond",
  "Kelpie",
  "Komondor",
  "Kuvasz",
  "Labradoodle",
  "Labrador",
  "Leonberg",
  "Lhasa",
  "Malamute",
  "Malinois",
  "Maltese",
  "Mastiff/bull",
  "Mastiff/english",
  "Mastiff/tibetan",
  "Mexicanhairless",
  "Mix",
  "Mountain/bernese",
  "Mountain/swiss",
  "Newfoundland",
  "Otterhound",
  "Ovcharka/caucasian",
  "Papillon",
  "Pekinese",
  "Pembroke",
  "Pinscher/miniature",
  "Pitbull",
  "Pointer/german",
  "Pointer/germanlonghair",
  "Pomeranian",
  "Poodle/miniature",
  "Poodle/standard",
  "Poodle/toy",
  "Pug",
  "Puggle",
  "Pyrenees",
  "Redbone",
  "Retriever/chesapeake",
  "Retriever/curly",
  "Retriever/flatcoated",
  "Retriever/golden",
  "Ridgeback/rhodesian",
  "Rottweiler",
  "Saluki",
  "Samoyed",
  "Schipperke",
  "Schnauzer/giant",
  "Schnauzer/miniature",
  "Setter/english",
  "Setter/gordon",
  "Setter/irish",
  "Sheepdog/english",
  "Sheepdog/shetland",
  "Shiba",
  "Shihtzu",
  "Spaniel/blenheim",
  "Spaniel/brittany",
  "Spaniel/cocker",
  "Spaniel/irish",
  "Spaniel/japanese",
  "Spaniel/sussex",
  "Spaniel/welsh",
  "Springer/english",
  "Stbernard",
  "Terrier/american",
  "Terrier/australian",
  "Terrier/bedlington",
  "Terrier/border",
  "Terrier/cairn",
  "Terrier/dandie",
  "Terrier/fox",
  "Terrier/irish",
  "Terrier/kerryblue",
  "Terrier/lakeland",
  "Terrier/norfolk",
  "Terrier/norwich",
  "Terrier/patterdale",
  "Terrier/russell",
  "Terrier/scottish",
  "Terrier/sealyham",
  "Terrier/silky",
  "Terrier/tibetan",
  "Terrier/toy",
  "Terrier/welsh",
  "Terrier/westhighland",
  "Terrier/wheaten",
  "Terrier/yorkshire",
  "Tervuren",
  "Vizsla",
  "Waterdog/spanish",
  "Weimaraner",
  "Whippet",
  "Wolfhound/irish",
];

const formReducer = (state, event) => {
  if (event.reset) {
    return {
      name: "",
      breed: "",
      photo_url: "",
      description: "",
      difficulty: 0,
    };
  }
  return {
    ...state,
    [event.name]: event.value,
  };
};

const registerNewPet = async (formData) => {
  const processedForm = formData;
  processedForm["difficulty"] = Number(formData["difficulty"]);
  axiosRequest(
    `${process.env.REACT_APP_host}/api/user/pets/`,
    "POST",
    processedForm
  );
};

//still need to add styling to image as well
export default function RegisterPet() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);
  const [dogPic, setDogPic] = useState("");
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();
    const sendData = formData;
    const id = user.id;
    sendData["user_id"] = user.id;
    const getUser = async () => {
      const res = await axios.get(`${process.env.REACT_APP_host}/login/${id}`);
      console.log(res.data);
      setUser(res.data);
    };
    registerNewPet(sendData).then(() => getUser());
    console.log(user);
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setFormData({ reset: true });
      navigate("/listing");
    }, 3000);
  };

  const handleChange = (event) => {
    const isCheckbox = event.target.type === "checkbox";
    if (event.target.name === "breed") {
      for (let each of dogList) {
        if (event.target.value === each) {
          const url = event.target.value.toString().toLowerCase();
          getSpecificDog(url).then((result) => {
            setDogPic(result);
            setFormData({
              name: "photo_url",
              value: result,
            });
          });
        }
      }
    }
    setFormData({
      name: event.target.name,
      value: isCheckbox ? event.target.checked : event.target.value,
    });
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      minWidth="400px"
    >
    <div className="create-form">
      <Typography variant="h5" align="center" paddingBottom="15px">
        Add a Pet to your Profile:
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
        <form onSubmit={handleSubmit} disabled={submitting} style->
          <fieldset disabled={submitting} style={{border: "none"}}>
            <label>
              <p>Name:</p>
              <input
                type="text"
                maxLength={249}
                name="name"
                onChange={handleChange}
                placeholder="What is your Pet's Name?"
                value={formData.name || ""}
                required
              />
            </label>
            <label>
              <p>Breed:</p>
              <input
                type="text"
                name="breed"
                list="dogbreed"
                onChange={handleChange}
                placeholder="Type or select from list"
              />
              <datalist id="dogbreed">
                {dogList.map((item) => (
                  <option key={item} value={item} />
                ))}
              </datalist>
            </label>
            {dogPic && (
              <div id="dog-photo">
                <img
                  src={formData.photo_url ? formData.photo_url : dogPic}
                  alt="dog"
                  style={{height: "200px", width: "auto"}}
                ></img>
                <p>Use temporary picture, or enter custom photo url below:</p>
              </div>
            )}

            <label>
              <p>Select a Photo:</p>
              <input
                type="url"
                maxLength={499}
                pattern="https://.*"
                name="photo_url"
                onChange={handleChange}
                placeholder="Choose image"
                value={formData.photo_url || ""}
              />
            </label>
            <label>
              <p>Description of your Pet:</p>
              <input
                type="text"
                maxLength={499}
                name="description"
                onChange={handleChange}
                placeholder="Loves to chew expensive shoes!"
                value={formData.description || ""}
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
          >            Submit
          </Button>
        </form>
      )}
    </div>
    </Grid>
  );
}
