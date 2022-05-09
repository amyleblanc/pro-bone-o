import React, { useEffect, useState } from 'react';
import './Listing.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
const axios = require('axios').default;


export default function Listing() {
  const [listing, setListing] = useState([]);

  useEffect(() => {
    const listings = async () => {
      const res = await axios('/api/listing')
      setListing(res.data)
    };
    const listingUser = async () => {
      const res = await axios('/api/listing')
      setListing(res.data)
    };
    listings();
    listingUser();
  }, []);

  const useListing = listing.map((listing)=>{
    console.log(listing);
    return (
      <Card class="card" sx={{ maxWidth: 345 }}>
        <CardMedia
        class="card"
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="Sitter Or Dog"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {listing.activity_type}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {listing.additional_details}
          </Typography>
        </CardContent>
        <CardActions class="card">
          <Button size="small">Apply</Button>
        </CardActions>
      </Card>
    );
    })

  return (
    <main>
      <section>
        <div>
          <h1>Current Listings</h1>
          <div className="container">
          {listing && useListing}
      </div>
        </div>
      </section>
    </main>
  );
}