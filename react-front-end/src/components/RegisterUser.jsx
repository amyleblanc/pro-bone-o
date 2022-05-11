import React, { useState, useReducer } from "react";
import axiosRequest from "../helper/axios";

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
  axiosRequest(`/api/user/`, "POST", processedForm);
};

//still need to add styling to image as well
export default function RegisterUser() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);
  const [userPic, setUserPic] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.password !== formData.verified) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
      return;
    }
    registerNewUser(formData);
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
    <div className="create-form">
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
      <form onSubmit={handleSubmit} disabled={submitting}>
        <fieldset disabled={submitting}>
          <label>
            <p>First Name:</p>
            <input
              type="text"
              maxLength={249}
              name="first_name"
              onChange={handleChange}
              placeholder="First Name"
              value={formData.first_name || ""}
              required
            />
          </label>
          <label>
            <p>Last Name:</p>
            <input
              type="text"
              maxLength={249}
              name="last_name"
              onChange={handleChange}
              placeholder="Last Name"
              value={formData.last_name || ""}
              required
            />
          </label>
          <label>
            <p>Email Address: (not publicly visible)</p>
            <input
              type="text"
              maxLength={249}
              name="email_address"
              onChange={handleChange}
              placeholder="Email Address"
              value={formData.email_address || ""}
              required
            />
          </label>
          <label>
            <p>Postal Code: (Let everyone know whereabouts you are!)</p>
            <input
              type="text"
              maxLength={6}
              name="postal_code"
              onChange={handleChange}
              placeholder="Ex. V3J8C4"
              value={formData.postal_code || ""}
              required
            />
          </label>
          <label>
            <p>Phone Number: (not publicly visible)</p>
            <input
              type="text"
              maxLength={11}
              name="phone_number"
              onChange={handleChange}
              placeholder="Phone number: 5557891234"
              value={formData.phone_number || ""}
              required
            />
          </label>
          {userPic && (
            <div id="user-photo">
              <img
                src={formData.photo_url ? formData.photo_url : userPic}
                alt="user"
              ></img>
            </div>
          )}

          <label>
            <p>Provide a Photo URL:</p>
            <input
              type="url"
              maxLength={499}
              pattern="https://.*"
              name="photo_url"
              onChange={handleChange}
              placeholder="What image would you like to use for the pet?"
              value={formData.photo_url || ""}
            />
          </label>
          {/* <label>
            <p>Please provide a small description of yourself!</p>
            <input
              type="text"
              maxLength={499}
              name="description"
              onChange={handleChange}
              placeholder="Let everyone know what makes you special!"
              value={formData.description || ""}
            />
          </label> */}

          <label>
            <p>Password: (min 6 characters)</p>
            {error && <p>Error! Please confirm your passwords match!</p>}
            <input
              id="password"
              name="password"
              type="password"
              onChange={handleChange}
              pattern="^\S{6,}$"
              placeholder="Password"
              value={formData.password || ""}
              required
            />
          </label>
          <label>
            <input
              id="password_two"
              name="verified"
              type="password"
              onChange={handleChange}
              pattern="^\S{6,}$"
              placeholder="Verify Password"
              value={formData.verified || ""}
              required
            />
          </label>
          <label>
            <p>Are you a pet owner?</p>
            <input
              type="checkbox"
              name="is_dog_owner"
              onChange={handleChange}
              value={formData.is_dog_owner || false}
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
