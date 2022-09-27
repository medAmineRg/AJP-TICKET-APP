import { DataGrid } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import classes from "./table.module.css";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "title", headerName: "Title", width: 130 },
  { field: "description", headerName: "Description", width: 300 },
  {
    field: "User",
    headerName: "Creator",
    width: 130,
  },
  {
    field: "urgent",
    headerName: "Urgent",
    width: 70,
    valueFormatter: params => (params.value ? "YES" : "NO"),
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    type: "date",
    width: 180,
    valueFormatter: params => formatDistanceToNow(new Date(params.value)),
  },

  {
    field: "updatedAt",
    headerName: "Updated At",
    type: "date",
    width: 180,
    valueFormatter: params => formatDistanceToNow(new Date(params.value)),
  },
];

export default function DataTable({
  rows,
  isLoading,
  rowCountState,
  page,
  pageSize,
  setPage,
  setPageSize,
  setSelectedRow,
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
          console.log(item);
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
