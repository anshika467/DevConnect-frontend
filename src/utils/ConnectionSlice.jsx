import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const ConnectionSlice = createSlice({
  name: "connections",
  initialState: null,
  reducers: {
    addConnections: (state, actions) => actions.payload,
    removeConnections: (state, actions) => null,
  },
});

export const { addConnections, removeConnections } = ConnectionSlice.actions;

export default ConnectionSlice.reducer;
