// Import
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRecord, ITableDataState } from '@/types';

// Constants
const DATA_URL = 'data/data.json';

// Interface
const initialState: ITableDataState = {
  data: [],
  loading: false,
  error: null,
};

// Async Thunk
export const fetchTableData = createAsyncThunk('tableData/fetchTableData', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) {
      return rejectWithValue('Failed to load data.');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return rejectWithValue('Failed to load data.');
  }
});

const deleteRecord = (data: IRecord[], idToDelete: string): IRecord[] => {
  return data
    .filter((record) => record.data.ID !== idToDelete)
    .map((record) => {
      if (record.children) {
        const updatedChildren = Object.keys(record.children).reduce(
          (acc, key) => {
            const filteredRecords = record.children[key].records.filter((child) => child.data.ID !== idToDelete);

            if (filteredRecords.length > 0) {
              acc[key] = {
                records: deleteRecord(filteredRecords, idToDelete),
              };
            }
            return acc;
          },
          {} as Record<string, { records: IRecord[] }>,
        );

        return {
          ...record,
          children: updatedChildren,
        };
      }
      return record;
    });
};

// Slice
const tableDataSlice = createSlice({
  name: 'tableData',
  initialState,
  reducers: {
    deleteTableData: (state, action: PayloadAction<string>) => {
      state.data = deleteRecord(state.data, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTableData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTableData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTableData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export
export const { deleteTableData } = tableDataSlice.actions;
export default tableDataSlice.reducer;
