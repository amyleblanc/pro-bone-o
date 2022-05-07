import React from "react";
import Listing from "./components/listing";

export default function Application() {
  return (
    <main>
      <section>
        <div>
          <h1>Pro-Bone-O</h1>
        </div>
        <div>
          <Listing />
        </div>
      </section>
    </main>
  );
}