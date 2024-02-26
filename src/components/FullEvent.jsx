import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import poster from "../assets/randomposter.webp";
import { format } from "date-fns";
import "../styles/FullEvent.css";

const FullEvent = ({ loggedIn }) => {
  const { id } = useParams();
  const [eventData, setEventData] = useState({
    date: Date.now(),
    event_desc: "",
    event_id: "",
    event_location: "",
    event_name: "",
    max_attendees: "",
    regular_ticket_price: "",
    vip_ticket_price: "",
  });
  const [ticketCount, setTicketCount] = useState({
    vip_tickets: 0,
    regular_tickets: 0,
  });

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
        });
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  useEffect(() => {
    const fetchTicketCount = async() => {
      try {
        const request = await fetch(
          `http://localhost:8080/ticket-booking/php/ticketcounter.php?user_id=2&event_id=${eventData.event_id}`,
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
            vip_tickets: response.vip_tickets ,
            regular_tickets: response.regular_tickets
          })
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (!loggedIn) {
      fetchTicketCount()
    }
  }, [eventData]);

  
  const dateHandler = (date) => {
    const dateObj = new Date(date);
    return `${format(dateObj, "EEE do MMMM")} at ${format(dateObj, "h:m aaa")}`;
  };

  return (
    <div className="full-event">
      <div className="full-event-cont">
        <img src={poster} alt="" className="full-event-poster" />
        <div className="full-event-body">
          <h1 className="full-event-body-header">{eventData.event_name}</h1>
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
        </div>
        <div className="full-event-ticket">
          <h1 className="full-event-body-header">Tickets</h1>
          <table className="ticket-table">
            <tbody>
              <tr className="ticket-table-row">
                <td className="ticket-table-heading">Regular Ticket</td>
                <td>KShs. {eventData.regular_ticket_price}</td>
                <td className="ticket-table-select-section">
                  <label htmlFor="" className="ticket-table-label">
                    Qty
                  </label>
                  <select
                    name=""
                    id=""
                    className="ticket-table-select"
                    disabled={loggedIn}
                  ></select>
                </td>
              </tr>
              <tr className="ticket-table-row">
                <td className="ticket-table-heading">VIP Ticket</td>
                <td>KShs. {eventData.vip_ticket_price}</td>
                <td className="ticket-table-select-section">
                  <label htmlFor="" className="ticket-table-label">
                    Qty
                  </label>
                  <select
                    name=""
                    id=""
                    className="ticket-table-select"
                    disabled={loggedIn}
                  ></select>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="full-event-ticket-disclaimer">
            *You can only book upto 5 tickets
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
      </div>
    </div>
  );
};

export default FullEvent;
