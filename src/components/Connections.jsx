import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/ConnectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1 className=" flex text-3xl justify-center my-10">No Connections Found</h1>;

  return (
    <div className="flex flex-col items-center my-10 gap-4">
      <h1 className="text-bold font-semibold text-4xl mb-3">Connections</h1>
      {connections.map((connection) => {
        const { _id, firstName, lastName, age, gender, photoUrl, about } =
          connection;
        return (
          <div
            key={_id}
            className="flex items-center m-2 p-4 rounded-lg bg-base-300 w-1/2"
          >
            <div>
              <img
                className="w-20 h-20 rounded-full"
                src={photoUrl}
                alt="User_photo"
              />
            </div>
            <div className="text-left mx-6">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
