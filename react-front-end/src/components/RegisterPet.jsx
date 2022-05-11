import React, { useState, useReducer } from "react";
import { getSpecificDog } from "../helper/fetchdog";
import axiosRequest from "../helper/axios";

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
  axiosRequest(`/api/user/pets/`, "POST", processedForm);
};

//still need to add styling to image as well
export default function RegisterPet() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);
  const [dogPic, setDogPic] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    registerNewPet(formData);
    setSubmitting(true);
    console.log(formData);
    setTimeout(() => {
      setSubmitting(false);
      setFormData({ reset: true });
    }, 3000);
  };

  const handleChange = (event) => {
    const isCheckbox = event.target.type === "checkbox";
    if (event.target.name === "breed") {
      const url = event.target.value.toString().toLowerCase();
      getSpecificDog(url).then((result) => {
        setDogPic(result);
        setFormData({
          name: "photo_url",
          value: result,
        });
      });
    }
    setFormData({
      name: event.target.name,
      value: isCheckbox ? event.target.checked : event.target.value,
    });
  };

  return (
    <div className="create-form">
      <h1>Add a Pet</h1>
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
              ></img>
              <p>Use Temporary Picture, or enter custom photo url below:</p>
            </div>
          )}

          <label>
            <p>Select a Photo:</p>
            <input
              type="url"
              //type="search"
              maxLength={499}
              pattern="https://.*"
              name="photo_url"
              onChange={handleChange}
              placeholder="What image would you like to use for the pet?"
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
              placeholder="Please provide any additional details you'd like to inlude about your pet."
              value={formData.description || ""}
            />
          </label>
          <label>
            <p>
              Does your pet require more than the average care or attention?
            </p>
            <p>How would you rate how easily it is to care for your pet?</p>
            <input
              type="number"
              max={5}
              min={1}
              name="difficulty"
              onChange={handleChange}
              placeholder="5 for very easy, 1 for has substantial additional care requirements."
              value={formData.difficulty || ""}
              required
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
