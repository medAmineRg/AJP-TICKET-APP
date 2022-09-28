import formatDistanceToNow from "date-fns/formatDistanceToNow";
export const ticketColumns = [
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

export const UserData = [
  // { labels: ["Jun", "Jul", "Aug"] },

  {
    id: 1,
    year: 2016,
    userGain: 80000,
    userLost: 823,
  },
  {
    id: 2,
    year: 2017,
    userGain: 45677,
    userLost: 345,
  },
  {
    id: 3,
    year: 2018,
    userGain: 78888,
    userLost: 555,
  },
  {
    id: 4,
    year: 2019,
    userGain: 90000,
    userLost: 4555,
  },
  {
    id: 5,
    year: 2020,
    userGain: 4300,
    userLost: 234,
  },
];
