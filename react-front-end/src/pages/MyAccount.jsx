import React from "react";
import { Typography, Container } from "@mui/material/";
import NavTabs from "../components/Tabs";

export default function MyAccount() {
  return (
    <div>
      <Container style={{ marginTop: "70px" }}>
        <Typography
          paddingBottom="40px"
          variant="h3"
          align="center"
          color="textSecondary"
        >
          My Account
        </Typography>
        <NavTabs />
      </Container>
    </div>
  );
}
