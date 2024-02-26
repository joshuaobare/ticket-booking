import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FullEvent = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState({
    date: "",
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
};

export default FullEvent;
