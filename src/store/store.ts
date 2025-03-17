// Import
import { configureStore } from '@reduxjs/toolkit';
import tableDataReducer from './tableDataSlice';

const store = configureStore({
  reducer: {
    tableData: tableDataReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export default store;
