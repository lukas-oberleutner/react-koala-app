// Import
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRecord, ITableDataState } from '@/types';

// Interface
const initialState: ITableDataState = {
  data: [],
};

const deleteRecord = (data: IRecord[], idToDelete: string): IRecord[] => {
  return data
    .filter((record) => record.data.ID !== idToDelete)
    .map((record) => {
      if (record.children) {
        const updatedChildren = Object.keys(record.children).reduce(
          (acc, key) => {
            const filteredRecords = record.children[key].records.filter(
              (child) => child.data.ID !== idToDelete,
            );

            if (filteredRecords.length > 0) {
              acc[key] = {
                records: deleteRecord(filteredRecords, idToDelete), // Rekurzivní volání
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
    setTableData: (state, action) => {
      state.data = action.payload; // Nastaví data z payloadu
    },
    deleteTableData: (state, action: PayloadAction<string>) => {
      state.data = deleteRecord(state.data, action.payload);
    },
  },
});

// Export
export const { setTableData, deleteTableData } = tableDataSlice.actions;
export default tableDataSlice.reducer;
