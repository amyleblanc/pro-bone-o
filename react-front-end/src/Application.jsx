import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import ResponsiveAppBar from "./components/NavBar";
import Listing from "./components/Listing";
import ListingForm from "./components/form";
import Splash from "./pages/splash";
import Profile from "./pages/Profile"

export default function Application() {
  return (
    <>
      <main>
        <BrowserRouter>
            <CssBaseline />
            <ResponsiveAppBar />
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/listing" element={<Listing />} />
            <Route path="/createlisting" element={<ListingForm />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}
