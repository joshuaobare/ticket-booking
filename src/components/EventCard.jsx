const EventCard = ({event}) => {
    return (
        <div key={event.event_id}>
            <div>{event.event_name}</div>
            <div>{event.date}</div>
            <div>{event.event_location}</div>
            <button>Book</button>
        </div>
    )
};

export default EventCard;
