import React, { useEffect, useState } from 'react';
import './Listing.css'
const axios = require('axios').default;


export default function Listing() {
  const [listing, setListing] = useState([]);

  useEffect(() => {
    const listings = async () => {
      const res = await axios('/api/listing')
      setListing(res.data)
    };
    listings();
  }, []);

  const useListing = listing.map((listing)=>{
    return <div key={listing.id}>
                <h3>{listing.id}</h3>
                <h4>{listing.activity_type}</h4>
                <p>{listing.additional_details}</p>
              </div> 
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