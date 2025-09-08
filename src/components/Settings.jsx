import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import Toast from "./Toast";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(BASE_URL + "/request/delete", {
        withCredentials: true,
      });

      await axios.delete(BASE_URL + "/deleteAccount", {
        withCredentials: true,
      });

      dispatch(removeUser());
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate("/login");
      }, 3000);
    } catch (err) {
      console.error("Account Deletion failed", err);
    }
  };

  return (
    <>
      <div className="h-screen flex flex-col items-center my-10 gap-4">
        <h1 className="font-semibold text-4xl mb-3">Settings</h1>
        <div className="flex items-center justify-between m-2 px-6 py-3 rounded-lg bg-base-300 w-2/3">
          <h2 className="text-xl font-semibold ">Delete My Account</h2>
          <button
            className="btn btn-soft btn-error"
            onClick={() => handleDelete()}
          >
            Delete
          </button>
        </div>
      </div>

      <Toast
        message="Account deleted successfully"
        type="error"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
};

export default Settings;
