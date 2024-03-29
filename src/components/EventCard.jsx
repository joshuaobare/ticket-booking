import blackbg from "../assets/blackbg.jpg";
import { format } from "date-fns";

// entry point is the UserHome component
const EventCard = ({ event }) => {
  const style = {
    background: `url(${ event.image || blackbg}) no-repeat`,
    backgroundSize: 'cover'
  };
  
  const dateHandler = (date) => {
    const dateObj = new Date(date);
    return `${format(dateObj, "EEE do MMMM")} at ${format(dateObj, "hh:mm aaa")}`
  };

  return (
    <div key={event.event_id} className="event-card">      
      <div className="event-card-poster" style={style}></div>
      <div className="event-card-date">{dateHandler(event.date)}</div>
      <div className="event-card-name">{event.event_name}</div>
      <div className="event-card-date">{event.event_location}</div>
      <div className="event-card-price">
        KShs. {event.regular_ticket_price} - KShs.{event.vip_ticket_price}
      </div>
     
    </div>
  );
};

export default EventCard;
