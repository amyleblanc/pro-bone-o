import { useRecoilValue } from "recoil";
import userState from "../components/atoms";
import Listing from "../components/Listing";

export default function MyListings() {
  const user = useRecoilValue(userState);
  const user_id = user.id;
  const url = `/user/listings/${user_id}`;

  return (
    <>
      <Listing
        url={`${process.env.REACT_APP_host}${url}`}
        type={"GET"}
        direction={"row-reverse"}
      />
    </>
  );
}
