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
        setAllEvents(response.events)
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvents();
  }, []);

  return (<div>
    {allEvents.map((event)=> {
        return (
            <div key={event.event_id}>
                <div>{event.event_name}</div>
                <div>{event.date}</div>
                <div>{event.event_location}</div>
                <button>Book</button>
            </div>
        )
    })}
  </div>);
};

export default UserHome;
