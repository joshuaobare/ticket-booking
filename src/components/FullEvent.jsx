import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import poster from "../assets/randomposter.webp";
import { format } from "date-fns";

const FullEvent = () => {
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

  useEffect(() => {
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
          console.log(response)
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
        console.log(eventData)
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvent();
  }, []);

  const dateHandler = (date) => {
    const dateObj = new Date(date);
    return `${format(dateObj, "EEE do MMMM")} at ${format(dateObj, "h:m aaa")}`
  };

  return (
    <div>
        <img src={poster} alt="" />
        <div>
            <h1>{eventData.event_name}</h1>
            <div>{dateHandler(eventData.date)}</div>
            <div>{eventData.event_location}</div>
            <div>KShs. {eventData.regular_ticket_price} - KShs.{eventData.vip_ticket_price}</div>
        </div>
    </div>
  )
};

export default FullEvent;
