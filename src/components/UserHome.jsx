import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { Link } from "react-router-dom";
import "../styles/UserHome.css";
import CreateEvent from "./CreateEvent";

// entry point is App component
const UserHome = ({ loggedIn }) => {
  const [allEvents, setAllEvents] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userData, setUserData] = useState({
    user_id: null,
    first_name: "",
    last_name: "",
    email: "",
    is_admin: false,
  });

  const userVerification = async (user_id) => {
    try {
      const request = await fetch(
        `http://localhost:8080/ticket-booking/php/fetchuser.php?id=${user_id}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const response = await request.json();
        
      if (response.user) {
        setUserData({
          user_id: response.user.user_id,
          first_name: response.user.first_name,
          last_name: response.user.last_name,
          email: response.user.email,
          is_admin: response.user.is_admin === 1 ? true : false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };  

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

      response.events.sort(
        (b, a) =>
        new Date(b.date).getTime() -
          new Date(a.date).getTime()           
      );


      setAllEvents(response.events);
    } catch (error) {
      console.log(error);
    }
  };

  const dialogToggler = () => {
    setDialogOpen((prevState) => !prevState);
  };

  // when component mounts all events are fetched
  useEffect(() => {
    fetchEvents();
    if (localStorage.getItem("user_id")) {
      userVerification(localStorage.getItem("user_id"));
    }
  }, []);

  //when loggedIn state changes, user is verified or userData state is refreshed
  useEffect(() => {
    fetchEvents();
    if (localStorage.getItem("user_id")) {
      userVerification(localStorage.getItem("user_id"));
    } else {
      setUserData({
        user_id: null,
        first_name: "",
        last_name: "",
        email: "",
        is_admin: false,
      });
    }
  }, [loggedIn]);

  return (
    <div className="UserHome">
      <div className="UserHome-cont">
        <div className="UserHome-cont-head">
          <h1 className="UserHome-heading">All Events</h1>
          {userData.is_admin ? (
            <div className="UserHome-create-event-cont">
              <button
                className="UserHome-create-event-btn"
                onClick={dialogToggler}
              >
                <span className="material-symbols-outlined">
                  calendar_add_on
                </span>
                Create Event
              </button>
            </div>
          ) : (
            ""
          )}
          <div className="UserHome-event-count">
            {allEvents.length} Event{allEvents.length === 1 ? "" : "s"}
          </div>
        </div>

        {allEvents.length > 0 ? (
          <div className="UserHome-events-grid">
            {allEvents.map((event) => {
              return (
                <Link to={`event/${event.event_id}`} key={event.event_id}>
                  <EventCard event={event} />
                </Link>
              );
            })}
            
          </div>
        ) : (
          <div>There are no upcoming events. Please check again soon</div>
        )}
      </div>
      <CreateEvent
        dialogOpen={dialogOpen}
        dialogToggler={dialogToggler}
        fetchEvents={fetchEvents}
      />
    </div>
  );
};

export default UserHome;
