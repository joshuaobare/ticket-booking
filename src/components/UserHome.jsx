import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { Link } from "react-router-dom";
import "../styles/UserHome.css"

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
        setAllEvents(response.events);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="UserHome">
      <h1>All Events</h1>
      <div>
        {allEvents.map((event) => {
          return (
            <Link to={`event/${event.event_id}`}>
              <EventCard event={event} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default UserHome;
