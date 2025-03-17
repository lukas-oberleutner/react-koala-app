// export interface RootState {
//   tableData: TableDataState;
// }
//
// export interface TableDataState {
//   data: IData;
// }
//
// export type IData = Array<IRecord>;
//
// export interface IRecord {
//   data: Record<string, string>;
//   children?: Record<string, { records: IRecord[] }>;
// }

export interface RootState {
  tableData: ITableDataState;
}

export interface ITableDataState {
  data: IRecord[];
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
