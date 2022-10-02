import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../../features/auth/authSlice";
import Card from "../ui/card";
import classes from "./home.module.css";

import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";
import { useState } from "react";

export default function HomeCom() {
  const [statistics, setStatistics] = useState({});
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector(state => state.auth);
  const getStatistics = async () => {
    const response = await axios.get("http://localhost:5000/ticket/statistics");
    setStatistics(response.data);
  };

  useEffect(
    function () {
      if (
        typeof localStorage.getItem("user") == "object" ||
        !localStorage.getItem("user")
      ) {
        router.push("/login");
      }

      if (typeof localStorage.getItem("user") == "string" && !user) {
        dispatch(loadUser(JSON.parse(localStorage.getItem("user"))));
      }
    },
    [dispatch, user]
  );

  useEffect(() => {
    if (user) {
      getStatistics();
    }
  }, [user]);
  const month = [
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
  let obj = {};
  if (statistics.ticketsByMonths && statistics.ticketsByMonths.length) {
    statistics.ticketsByMonths.map(m => {
      obj[m.month] = m.tickets;
    });
  }

  return (
    <div className={classes.container}>
      <h3>Dashboard</h3>

      <div className={classes.statistics}>
        <Card text={"Total Tickets"} number={statistics.totalTickets} />
        <Card text={"In Progress Tickets"} number={statistics.pendingTickets} />
        <Card text={"Completed Tickets"} number={statistics.completedTickets} />
        <Card
          text={"Not Started Tickets"}
          number={statistics.notStartedTickets}
        />
      </div>
      {statistics.ticketsByMonths && (
        <>
          <div className={classes.chart}>
            <h3>Opened Tickets This Year</h3>

            <Bar
              data={{
                labels: month,
                datasets: [
                  {
                    label: "Total Ticket",
                    data: month.map(m => obj[m]),
                    backgroundColor: [
                      "#F2972E",
                      "#96427E",
                      "#7C53A5",
                      "#585BAD",
                      "#0E6A9B",
                      "#29B8D5",
                      "#F05142",
                      "#FDBB39",
                      "#F2972E",
                      "#BED454",
                      "#63C08B",
                      "#51BFAE",
                    ],
                  },
                ],
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
