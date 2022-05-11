import React from "react";
import ReactDOM from "react-dom/client";
import Application from "./Application";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { RecoilRoot } from "recoil";


//ReactDOM.render(<Application />, document.getElementById('root'));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <Application />
    </RecoilRoot>
  </React.StrictMode>
);

serviceWorker.unregister();
