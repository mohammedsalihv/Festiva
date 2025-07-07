export interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T, index?: number) => React.ReactNode);
  center?: boolean;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
  renderRowStart?: (row: T, index: number) => React.ReactNode;
}
