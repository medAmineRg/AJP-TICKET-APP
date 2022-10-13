import { DataGrid } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import classes from "./table.module.css";

export default function DataTable({
  rows,
  isLoading,
  rowCountState,
  page,
  pageSize,
  setPage,
  setPageSize,
  setSelectedRow,
  columns,
}) {
  const dispatch = useDispatch();
  return (
    <div className={classes.table}>
      <DataGrid
        autoHeight
        rows={rows}
        rowCount={rowCountState}
        loading={isLoading}
        rowsPerPageOptions={[10, 5]}
        pagination
        page={page}
        pageSize={pageSize}
        paginationMode="server"
        onPageChange={newPage => {
          dispatch(setPage(newPage));
        }}
        onSelectionModelChange={item => {
          setSelectedRow(item[0]);
        }}
        onPageSizeChange={newPageSize => {
          dispatch(setPageSize(newPageSize));
        }}
        columns={columns}
        // checkboxSelection
      />
    </div>
  );
}
