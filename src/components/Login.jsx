import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailID, setEmailID] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailID,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something Went Wrong!!!");
      console.error(err);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailID,
          password,
        },
        { withCredentials: true }
      );
      console.log(res);
      dispatch(addUser(res?.data?.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something Went Wrong!!!");
      console.error(err);
    }
  };

  return (
    <div className="h-screen">
      <div className="flex justify-center my-10">
        <div className="card card-border bg-base-300 w-96">
          <div className="card-body">
            <h2 className="card-title justify-center">
              {isLoginForm ? "Login" : "Sign Up"}
            </h2>
            <div>
              {!isLoginForm && (
                <>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">First Name</legend>
                    <input
                      type="text"
                      className="input"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </fieldset>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Last Name</legend>
                    <input
                      type="text"
                      className="input"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </fieldset>
                </>
              )}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Email ID</legend>
                <input
                  type="text"
                  className="input"
                  value={emailID}
                  onChange={(e) => setEmailID(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Password</legend>
                <input
                  type="text"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </fieldset>
            </div>
            <p className="text-red-400">{error}</p>
            <div className="card-actions justify-center m-3">
              <button
                className="btn btn-accent"
                onClick={isLoginForm ? handleLogin : handleSignUp}
              >
                {isLoginForm ? "Login" : "Sign Up"}
              </button>
            </div>
            <p
              className=" link-primary text-center cursor-pointer hover:underline text-sm"
              onClick={() => setIsLoginForm((value) => !value)}
            >
              {isLoginForm
                ? "New User: Sign up Here"
                : "Existing User: Login Here"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
