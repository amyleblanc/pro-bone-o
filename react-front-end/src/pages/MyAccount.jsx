import React from "react";
import { useRecoilValue } from "recoil";
import { Typography, Container } from "@mui/material/";
import userState from "../components/atoms";
import NavTabs from "../components/Tabs";

export default function MyAccount() {
  const user = useRecoilValue(userState);

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
