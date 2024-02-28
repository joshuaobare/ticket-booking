import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import poster from "../assets/blackbg.jpg";
import { format } from "date-fns";
import "../styles/FullEvent.css";
import EditEvent from "./EditEvent";
import DeleteEvent from "./DeleteEvent";
import { useNavigate } from "react-router-dom";

const FullEvent = ({ loggedIn }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    user_id: null,
    first_name: "",
    last_name: "",
    email: "",
    is_admin: false,
  });
  const [bookingSuccessful, setBookingSuccessful] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventData, setEventData] = useState({
    date: Date.now(),
    event_desc: "",
    event_id: "",
    event_location: "",
    event_name: "",
    max_attendees: "",
    regular_ticket_price: "",
    vip_ticket_price: "",
    image: "",
  });
  const [ticketCount, setTicketCount] = useState({
    vip_tickets: 0,
    regular_tickets: 0,
    availableCount: 0,
  });

  const [selectedTickets, setSelectedTickets] = useState({
    vip_tickets: 0,
    regular_tickets: 0,
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
          is_admin: response.user.is_admin === "1" ? true : false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEvent = async () => {
    try {
      const request = await fetch(
        `http://localhost:8080/ticket-booking/php/fetchevent.php?id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const response = await request.json();

      if (response.event) {
        const {
          date,
          event_desc,
          event_id,
          event_location,
          event_name,
          max_attendees,
          regular_ticket_price,
          vip_ticket_price,
          image,
        } = response.event;
        setEventData({
          date,
          event_desc,
          event_id,
          event_location,
          event_name,
          max_attendees,
          regular_ticket_price,
          vip_ticket_price,
          image,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvent();
    if (localStorage.getItem("user_id")) {
      userVerification(localStorage.getItem("user_id"));
    }
  }, []);

  const deleteEvent = async () => {
    try {
      const request = await fetch(
        `http://localhost:8080/ticket-booking/php/deleteevent.php`,
        {
          method: "DELETE",          
          headers: {
            "Content-type": "application/json",
          },          
          body: JSON.stringify({event_id: id}),
        }
      );
      const response = await request.json();
      console.log(response)
      
      if (response.message) {
        deleteDialogToggler()
        navigate("/");
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchTicketCount = async () => {
      try {
        const request = await fetch(
          `http://localhost:8080/ticket-booking/php/ticketcounter.php?user_id=${userData.user_id}&event_id=${eventData.event_id}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        const response = await request.json();

        if (response.message) {
          setTicketCount({
            vip_tickets: Number(response.vip_tickets),
            regular_tickets: Number(response.regular_tickets),
            availableCount:
              6 -
              (Number(response.vip_tickets) +
                Number(response.regular_tickets) +
                selectedTickets.regular_tickets +
                selectedTickets.vip_tickets),
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (!loggedIn) {
      fetchTicketCount();
    }
  }, [eventData]);

  const dateHandler = (date) => {
    const dateObj = new Date(date);
    return `${format(dateObj, "EEE do MMMM")} at ${format(dateObj, "h:m aaa")}`;
  };

  useEffect(() => {
    setTicketCount((prevState) => {
      return {
        ...prevState,
        availableCount:
          6 -
          (Number(ticketCount.vip_tickets) +
            Number(ticketCount.regular_tickets) +
            selectedTickets.regular_tickets +
            selectedTickets.vip_tickets),
      };
    });
  }, [selectedTickets]);

  const decrementCount = (ticketType) => {
    setSelectedTickets((prevState) => {
      return { ...prevState, [ticketType]: prevState[ticketType] - 1 };
    });
  };

  const incrementCount = (ticketType) => {
    setSelectedTickets((prevState) => {
      return { ...prevState, [ticketType]: prevState[ticketType] + 1 };
    });
  };

  const bookTickets = async () => {
    try {
      const request = await fetch(
        "http://localhost:8080/ticket-booking/php/bookticket.php",
        {
          method: "POST",
          body: JSON.stringify({
            ...selectedTickets,
            event_id: eventData.event_id,
            user_id: userData.user_id,
            regular_ticket_price: eventData.regular_ticket_price,
            vip_ticket_price: eventData.vip_ticket_price,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const response = await request.json();
      console.log(response);

      if (response.message.length > 0) {
        fetchEvent();
        setSelectedTickets({
          vip_tickets: 0,
          regular_tickets: 0,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editDialogToggler = () => {
    setEditDialogOpen((prevState) => !prevState);
  };

  const deleteDialogToggler = () => {
    setDeleteDialogOpen((prevState) => !prevState);
  };

  return (
    <div className="full-event">
      <div className="full-event-cont">
        <img
          src={eventData.image || poster}
          alt=""
          className="full-event-poster"
        />
        <div className="full-event-body">
          <h1 className="full-event-body-header">{eventData.event_name}</h1>
          <div className="full-event-body-description">
            {eventData.event_desc}
          </div>
          <div className="full-event-body-date">
            <span className="material-symbols-outlined">schedule</span>{" "}
            {dateHandler(eventData.date)}
          </div>
          <div className="full-event-body-location">
            {" "}
            <span className="material-symbols-outlined">location_on</span>
            {eventData.event_location}
          </div>
          <div className="full-event-body-prices">
            {" "}
            <span className="material-symbols-outlined">local_activity</span>
            KShs. {eventData.regular_ticket_price} - KShs.
            {eventData.vip_ticket_price}
          </div>
          <div className="full-event-body-ticket-count">
            Available Tickets: {eventData.max_attendees}
          </div>
          {userData.is_admin ? (
            <div className="full-event-admin-btns">
              <button
                className="full-event-edit-btn"
                onClick={editDialogToggler}
              >
                Edit Event
              </button>
              <button
                className="full-event-delete-btn"
                onClick={deleteDialogToggler}
              >
                Delete Event
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="full-event-ticket">
          <h1 className="full-event-body-header">Tickets</h1>
          <table className="ticket-table">
            <tbody>
              <tr className="ticket-table-row">
                <td className="ticket-table-heading">Regular Ticket</td>
                <td>KShs. {eventData.regular_ticket_price}</td>
                <td className="ticket-table-select-section">
                  <button
                    disabled={selectedTickets.regular_tickets === 0}
                    onClick={() => decrementCount("regular_tickets")}
                  >
                    -
                  </button>
                  <div>{selectedTickets.regular_tickets}</div>
                  <button
                    disabled={ticketCount.availableCount === 0}
                    onClick={() => incrementCount("regular_tickets")}
                  >
                    +
                  </button>
                </td>
              </tr>
              <tr className="ticket-table-row">
                <td className="ticket-table-heading">VIP Ticket</td>
                <td>KShs. {eventData.vip_ticket_price}</td>
                <td className="ticket-table-select-section">
                  <button
                    disabled={selectedTickets.vip_tickets === 0}
                    onClick={() => decrementCount("vip_tickets")}
                  >
                    -
                  </button>
                  <div>{selectedTickets.vip_tickets}</div>
                  <button
                    disabled={ticketCount.availableCount === 0}
                    onClick={() => incrementCount("vip_tickets")}
                  >
                    +
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="full-event-ticket-disclaimer">
            {ticketCount.availableCount === 0 ? (
              <div className="full-event-ticket-disclaimer-error">
                You have exceeded the number of tickets you can book
              </div>
            ) : (
              <div>*You can only book upto 5 tickets</div>
            )}
          </div>
          {loggedIn ? (
            <div>
              <div>Please login to book tickets</div>
              <button>Login</button>
            </div>
          ) : (
            ""
          )}
        </div>
        <button
          disabled={ticketCount.availableCount === 0}
          onClick={bookTickets}
        >
          Book
        </button>
      </div>
      <EditEvent
        eventData={eventData}
        dialogOpen={editDialogOpen}
        dialogToggler={editDialogToggler}
        fetchEvent={fetchEvent}
        event_id={id}
      />
      <DeleteEvent
        dialogOpen={deleteDialogOpen}
        dialogToggler={deleteDialogToggler}
        deleteEvent = {deleteEvent}
      />
    </div>
  );
};

export default FullEvent;
