import React, { useEffect } from "react";
import Listing from "./components/Listing";
import ListingForm from "./components/form";
import Login from "./components/Login";
import Logout from "./components/Logout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { atom, useRecoilState } from "recoil";

import CssBaseline from "@mui/material/CssBaseline";
import ResponsiveAppBar from "./components/NavBar";
import Splash from "./pages/splash";
import RegisterPet from "./components/RegisterPet";
import RegisterUser from "./components/RegisterUser";
import Profile from "./pages/Profile";

const axios = require("axios").default;

const userState = atom({
  key: "userState",
  default: [],
});

export default function Application() {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`/login/1`);
      setUser(res.data);
    };
    getUser();
  }, []);

  return (
    <>
      <main>
        <BrowserRouter>
          <CssBaseline />
          <ResponsiveAppBar />
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/listing" element={<Listing url={"/api/listing"} />} />
            <Route path="/createlisting" element={<ListingForm />} />
            <Route path="/registerPet" element={<RegisterPet />} />
            <Route path="/registerUser" element={<RegisterUser />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/profile" element={<Profile url={"/api/users/1"} />} /> {/* Hard-coded to user 1 */}
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}
