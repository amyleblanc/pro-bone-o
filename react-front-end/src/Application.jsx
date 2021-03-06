import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListingForm from "./components/form";
import Login from "./components/Login";
import Logout from "./components/Logout";
import RegisterPet from "./components/RegisterPet";
import RegisterUser from "./components/RegisterUser";
import Splash from "./pages/splash";
import MyAccount from "./pages/MyAccount";
import CssBaseline from "@mui/material/CssBaseline";
import ResponsiveAppBar from "./components/NavBar";
import Chat from "./components/Chat";
import AllListings from "./pages/AllListings";

export default function Application() {
  return (
    <>
      <main>
        <BrowserRouter>
          <CssBaseline />
          <ResponsiveAppBar />
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/listing" element={<AllListings />} />
            <Route path="/createlisting" element={<ListingForm />} />
            <Route path="/registerPet" element={<RegisterPet />} />
            <Route path="/registerUser" element={<RegisterUser />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/myaccount" element={<MyAccount />} />
            <Route path="/comments" element={<Chat />} />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}
