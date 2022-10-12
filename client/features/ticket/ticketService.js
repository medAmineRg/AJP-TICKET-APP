import axios from "axios";
let URL = process.env.NEXT_PUBLIC_URL;

const getTicket = async (pagination, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    URL +
      `ticket?limit=${pagination ? pagination.limit : 10}&page=${
        pagination ? pagination.page : 0
      }`,
    config
  );
  return response.data;
};
const createTicket = async (ticket, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(URL + "ticket", ticket, config);
  return response.data;
};
const updateTicket = async (ticket, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(
    URL + `ticket/${ticket.id}`,
    ticket,
    config
  );
  return response.data;
};
const deleteTicket = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(URL + `ticket/${id}`, config);
  return response.data;
};

const filterTicket = async (filterCriteria, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { creator, status, category, startDate, endDate, urgent } =
    filterCriteria;
  let filterURL = URL + "ticket/filter?";

  if (urgent) {
    filterURL = filterURL + `&urgent=${urgent}`;
  }
  if (creator) {
    filterURL = filterURL + `&creator=${creator}`;
  }
  if (status) {
    filterURL = filterURL + `&status=${status}`;
  }

  if (category) {
    filterURL = filterURL + `&category=${category}`;
  }

  if (startDate) {
    filterURL = filterURL + `&startDate=${startDate}`;
  }

  if (endDate) {
    filterURL = filterURL + `&endDate=${endDate}`;
  }

  const response = await axios.get(filterURL, config);
  return response.data;
};

const ticketService = {
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
  filterTicket,
};

export default ticketService;
