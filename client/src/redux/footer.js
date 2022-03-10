import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
const initialState = {
  footer: null,
  footers: [],
  loading: false,
  loadingfooter: false,
  loadingDeleteing: false,
  errors: null,
};

// @GET /api/tasks

export const getFooterLinks = createAsyncThunk(
    "footer/getfooterLinks",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get("http://localhost:5000/api/footer");
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  



  const footerSlice = createSlice({
    name: "footer",
    initialState,
    reducers: {
      resetFooter(state) {
        state.posted = false
      }
    },
    extraReducers: {
        [getFooterLinks.pending]: (state) => {
            state.loading = true;
            state.errors = null;
          },
          [getFooterLinks.fulfilled]: (state, action) => {
            state.footers = action.payload;
      
            state.loading = false;
            state.errors = null;
          },
          [getFooterLinks.rejected]: (state, action) => {
            state.footers = null;
            state.loading = false;
            state.errors = action.payload;
          },

         
   
    },

    });

    export const { resetTaskstatus } = footerSlice.actions
export default footerSlice.reducer;