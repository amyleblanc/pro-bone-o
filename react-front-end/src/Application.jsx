import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Listing from "./components/Listing";
import ListingForm from "./components/form";
import Login from "./components/Login";
import Logout from "./components/Logout";
import RegisterPet from "./components/RegisterPet";
import RegisterUser from "./components/RegisterUser";
import Splash from "./pages/splash";
import ProfileProtec from "./pages/ProfileProtec";
import MyListings from "./pages/MyListings";
import MyBookings from "./pages/MyBookings";
import CssBaseline from "@mui/material/CssBaseline";
import ResponsiveAppBar from "./components/NavBar";
import Chat from "./components/Chat";
import FilterBar from "./components/searchbar";

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
            <Route path="/registerUser" element={<RegisterUser />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route
              path="/mylistings"
              element={<MyListings url={"/api/listing"} />}
            />
            <Route path="/profile" element={<ProfileProtec />} />
            <Route
              path="/mylistings"
              element={<MyListings url={"/api/listing"} />}
            />
            <Route path="/mybookings" element={<MyBookings />} />
            <Route path="/comments" element={<Chat />} />
            <Route path="/searchbar" element={<FilterBar />} />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}
