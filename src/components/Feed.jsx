import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const alertShown = useRef(false);

  const getFeed = async () => {
    try {
      if (feed) return;
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error(err.message);
      // Alert Message - In case database error occurs...
      if (!alertShown.current) {
        alert("Database Error: Unable to fetch feed data.");
        alertShown.current = true;
      }
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  // <---------------------------------- Error ---------------------------------->
  if (!feed)
    return (
      <h1 className="text-center text-3xl font-bold my-10">
        Please Wait... Your Feed will be fetched shortly!!
      </h1>
    );

  // <-------------------------------- Empty Feed -------------------------------->
  if (feed.length <= 0)
    return (
      <h1 className="flex justify-center my-10">
        No more users are available in the feed!!!
      </h1>
    );

  return (

    feed && (
      <div className="h-full flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
