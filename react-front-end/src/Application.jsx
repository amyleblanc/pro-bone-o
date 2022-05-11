import React from "react";
import Listing from "./components/Listing";
import ListingForm from "./components/form";
import Login from "./components/Login";
import Logout from "./components/Logout";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";

import ResponsiveAppBar from "./components/NavBar";
import Splash from "./pages/splash";
import RegisterPet from "./components/RegisterPet";

export default function Application() {
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
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}
