import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography, Container } from "@mui/material/";
import userState from "../components/atoms";
import NavTabs from "../components/Tabs";
import axiosRequest from "../helper/axios";

export default function MyBookings(props) {
//   const [listings, setListings] = useState([]);
//   const { url } = props;

//   useEffect(() => {
//     axiosRequest(url, "GET").then((res) => setListings(res));
//   }, [url]);

//   const user = useRecoilValue(userState);
//   console.log("user info: ", user);
//   console.log("listing info: ", listings);

//   const filterListings = (listings, userID) => {
//     const filtered = [];
//     for (let listing of listings) {
//       if (listing.id === userID) {
//         filtered.push(listing);
//       };
//     };
//     return filtered;
//   }
  
//   const userListings = filterListings(listings, user.id);
//   console.log("userListings Info: ", userListings);

//   return (
//     <div>
//       <Container maxWidth="sm" style={{ marginTop: "100px" }}>
//         <Typography
//           paddingBottom="40px"
//           variant="h3"
//           align="center"
//           color="textSecondary"
//         >
//           My Account
//         </Typography>
        
//         <Card align="center">
//           <NavTabs />
//         </Card>
//         {userListings.map(list => (
//           <>
//             <Card
//               sx={{
//                 display: "flex",
//                 flexDirection: 'column',
//                 maxWidth: 552,
//                 minWidth: 200,
//                 bgcolor: "background.paper",
//                 boxShadow: 1,
//                 borderRadius: 0.5,
//                 p: 2,
//                 mt: 5,
//               }}
//             >
//               <Box sx={{ display: 'flex', flexDirection: 'row' }}>
//                 <Avatar
//                     src={list.pets.photo_url}
//                     alt="pet avatar"
//                     sx={{ width: 90, height: 90, marginRight: 5 }}
//                   />
//                 <CardContent sx={{width: 350}}>
//                   <Typography gutterBottom>
//                     <b>Pet Name: </b>{list.pets.name}
//                   </Typography>
//                   <Typography gutterBottom>
//                     <b>Service Requested: </b>{list.activity_type.charAt(0).toUpperCase() + list.activity_type.slice(1)}
//                   </Typography>
//                   <Typography gutterBottom>
//                     <b>Start Time: </b>{list.start_time}
//                   </Typography>
//                   <Typography gutterBottom>
//                     <b>End Time: </b>{list.end_time} {/* NEEDS TO BE DISPLAYED PROPERLY */}
//                   </Typography>
//                   <Typography gutterBottom>
//                     <b>Status: </b>{list.accepted ? "Accepted" : "Pending"}
//                   </Typography>
//                 </CardContent>
//               </Box>
//               <CardActions sx={{width: 200}}>
//                 <Button>Edit</Button>
//               </CardActions>
//             </Card>
//           </>
//         ))}
//       </Container>
//     </div>
//   );
}
