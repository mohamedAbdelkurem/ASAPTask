import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
const initialState = {
  service: null,
  services: [],
  loading: false,
  loadingArticle: false,
  loadingDeleteing: false,
  errors: null,
};



export const getServices = createAsyncThunk(
    "services/getServices",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get("http://localhost:5000/api/service");
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  



  const serviceSlice = createSlice({
    name: "services",
    initialState,
    reducers: {
      resetServices(state) {
        state.posted = false
      }
    },
    extraReducers: {
        [getServices.pending]: (state) => {
            state.loading = true;
            state.errors = null;
          },
          [getServices.fulfilled]: (state, action) => {
            state.services = action.payload;
      
            state.loading = false;
            state.errors = null;
          },
          [getServices.rejected]: (state, action) => {
            state.services = null;
            state.loading = false;
            state.errors = action.payload;
          },

   
   
    },

    });

    export const { resetServices } = serviceSlice.actions
export default serviceSlice.reducer;