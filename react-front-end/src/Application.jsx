import React from "react";
import Listing from "./components/Listing";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";

import ResponsiveAppBar from "./components/NavBar";
import Splash from "./pages/splash";

export default function Application() {
  return (
    <>
      <CssBaseline />
      <ResponsiveAppBar />
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/listing" element={<Listing />} />
            {/* <Route path="/create" element={<ListingForm />} /> */}
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}
