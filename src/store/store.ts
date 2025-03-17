// Import
import { configureStore } from '@reduxjs/toolkit';
import tableDataReducer from './tableDataSlice';

const store = configureStore({
  reducer: {
    tableData: tableDataReducer,
  },
});

export default store;
