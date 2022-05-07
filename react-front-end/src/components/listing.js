import React, { useEffect, useState } from 'react';

export default function Listing() {
  const [listing, setListing] = useState();

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(users => {
        setListing(users)
      });
  }, []);

  return (
    <main>
      <section>
        <div>
          <h1>Current Listings</h1>
          <ul>
            {listing.map(listing =>
              <li key={listing.id}>{listing.activity_type}</li>
              )}
          </ul>
        </div>
      </section>
    </main>
  );
}