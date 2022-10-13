import formatDistanceToNow from "date-fns/formatDistanceToNow";
export const ticketColumns = [
  { field: "id", headerName: "ID", width: 20 },
  { field: "title", headerName: "Title", width: 130 },
  { field: "description", headerName: "Description", width: 220 },
  {
    field: "User",
    headerName: "Creator",
    width: 80,
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
    field: "category",
    headerName: "Category",
    width: 120,
  },
  {
    field: "solution",
    headerName: "Solution",
    width: 220,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    type: "date",
    width: 130,
    valueFormatter: params => formatDistanceToNow(new Date(params.value)),
  },

  {
    field: "updatedAt",
    headerName: "Updated At",
    type: "date",
    width: 130,
    valueFormatter: params => formatDistanceToNow(new Date(params.value)),
  },
];

export const userColumns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "fullName", headerName: "Full Name", width: 130 },
  { field: "email", headerName: "Email", width: 230 },

  {
    field: "role",
    headerName: "Role",
    width: 100,
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

export const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
