import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

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
  });

  if (!feed)
    return (
      <h1 className="text-center text-3xl font-bold my-10">
        Please Wait... Your Feed will be fetched shortly!!
      </h1>
    );

  if (feed.length === 0)
    return (
      <h1 className="flex justify-center my-10">
        No more users are available in the feed!!!
      </h1>
    );

  return (
    <div className="h-full flex flex-col items-center gap-4">
      <div>
        {feed.map((user) => {
          return (
            <div key={user._id} className="flex justify-center my-5">
              <UserCard user={user} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Feed;
