import { useEffect, useState } from "react";

const UserHome = () => {
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const request = await fetch(
          "http://localhost:8080/ticket-booking/php/fetchevents.php",
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",              
            },
          }
        );
        const response = await request.json();

        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvents();
  }, []);

  return <div></div>;
};

export default UserHome;
