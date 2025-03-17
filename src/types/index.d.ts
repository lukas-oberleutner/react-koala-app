export interface RootState {
  tableData: ITableDataState;
}

export interface ITableDataState {
  data: IRecord[];
  loading: boolean;
  error: string | null;
}

export interface IRecord {
  data: {
    ID: string;
    [key: string]: string | number;
  };
  children: {
    [key: string]: {
      records: IRecord[];
    };
  };
}
