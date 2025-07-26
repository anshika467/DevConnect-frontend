import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  const handleSendRequest = async (status, user_Id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + user_Id,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUserFromFeed(user_Id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const { firstName, lastName, age, gender, about, photoUrl } = user;
  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure className="aspect-[3/3] overflow-hidden">
        <img
          src={photoUrl}
          alt="Photo_User"
          className="w-full h-full object-cover p-4"
        />
      </figure>
      <div className="card-body flex justify-between">
        <div>
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + " , " + gender}</p>}
          <p>{about}</p>
        </div>
        <div className="card-actions justify-center my-4">
          <button
            className="btn btn-soft btn-success"
            onClick={() => handleSendRequest("interested", user._id)}
          >
            Interested
          </button>
          <button
            className="btn btn-soft btn-error"
            onClick={() => handleSendRequest("ignored", user._id)}
          >
            Ignored
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
