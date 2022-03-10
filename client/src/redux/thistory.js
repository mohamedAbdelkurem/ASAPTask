import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
const initialState = {
  taskhist: null,
  taskhistory: [],
  taskhistoryAll: [],
  loading: false,
  loadingTaskHistory: false,
  loadingDeleteing: false,
  errors: null,
};

export const getTaskHistory = createAsyncThunk(
    "thistory/gettaskshistory",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get("http://localhost:5000/api/thistory");
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const getLAstTaskHistoryforTask = createAsyncThunk(
    "thistory/gettaskshistoryfortask",
    async ( task , { rejectWithValue, dispatch }) => {
      try {
        const response = await axios.put(
          'http://localhost:5000/api/thistory/task'
         );

          return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );


  export const getTaskhistorybytaskID = createAsyncThunk(
    "thistory/gettaskhistorybytaskid",
    async ( task , { rejectWithValue, dispatch }) => {
      try {
      
        const response = await axios.put(
         'http://localhost:5000/api/thistory/taskid',
         {task}
        );
       
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const createtaskhistory = createAsyncThunk(
    "thistory/createtaskhistory",
    async (
      { comment,assignedto,task ,taskstatus  },
      { rejectWithValue }
    ) => {
      try {
        const data = {
          comment,assignedto,task ,taskstatus
        
  
        };
        const response = await axios.post(
          "http://localhost:5000/api/thistory",
          data
        );
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );


  
  const taskHistorySlice = createSlice({
    name: "thistory",
    initialState,
    reducers: {
        resetTaskHistory(state) {
        state.posted = false
      }
    },
    extraReducers: {
        [getTaskHistory.pending]: (state) => {
            state.loading = true;
            state.errors = null;
          },
          [getTaskHistory.fulfilled]: (state, action) => {
            state.taskhistory = action.payload;
      
            state.loading = false;
            state.errors = null;
          },
          [getTaskHistory.rejected]: (state, action) => {
            state.taskhistory = null;
            state.loading = false;
            state.errors = action.payload;
          },

          [getLAstTaskHistoryforTask.pending]: (state) => {
            state.loading = true;
            state.errors = null;
          },
          [getLAstTaskHistoryforTask.fulfilled]: (state, action) => {
            state.taskhist = action.payload;
      
            state.loading = false;
            state.errors = null;
          },
          [getLAstTaskHistoryforTask.rejected]: (state, action) => {
            state.taskhist = null;
            state.loading = false;
            state.errors = action.payload;
          },


          [getTaskhistorybytaskID.pending]: (state) => {
            state.loading = true;
            state.errors = null;
          },
          [getTaskhistorybytaskID.fulfilled]: (state, action) => {
            state.taskhistoryAll = action.payload;
      
            state.loading = false;
            state.errors = null;
          },
          [getTaskhistorybytaskID.rejected]: (state, action) => {
            state.taskhistoryAll = null;
            state.loading = false;
            state.errors = action.payload;
          },
          // ─── Create task ───────────────────────────────────────────────────────
          //
          [createtaskhistory.pending]: (state) => {
            state.loading = true;
            state.errors = null;
          },
          [createtaskhistory.fulfilled]: (state, action) => {
            state.taskhistory = action.payload.taskhistory;
            state.posted = true
            state.loading = false;
            state.errors = null;
          },
          [createtaskhistory.rejected]: (state, action) => {
      
            state.loading = false;
            state.errors = action.payload;
          },
   
   
    },

    });

    export const { resetTaskHistory } = taskHistorySlice.actions
export default taskHistorySlice.reducer;
