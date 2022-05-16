import { atom } from "recoil";

const searchState = atom({
  key: "searchState",
  default: {
    type: "sitter-request",
    activity: "Anything!",
    start: "",
    end: "",
    postal: "",
  },
});

export default searchState;
