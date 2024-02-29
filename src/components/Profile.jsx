import { useParams } from "react-router-dom";
import "../styles/Profile.css";
import { useEffect, useState } from "react";
import "../styles/EventCard.css";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({
    user_id: null,
    first_name: "",
    last_name: "",
    email: "",
    is_admin: false,
  });
  const [eventData, setEventData] = useState([
    {
      DATE: Date.now(),
      EVENT_DESC: "",
      EVENT_LOCATION: "",
      EVENT_NAME: "",
      IMAGE: "",
      EVENT_ID: "",
      TICKET_ID:"",
      TICKET_PRICE: "",
      TICKET_TYPE: "",
      TIMESTAMP: Date.now(),
    },
  ]);

  const fetchUser = async (user_id) => {
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

  const fetchEvents = async () => {
    try {
      const request = await fetch(
        `http://localhost:8080/ticket-booking/php/fetchuserevents.php?user_id=${userData.user_id}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const response = await request.json();
      console.log(response)

      if (response.message) {
        setEventData(response.message);
      } else {
        setEventData([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser(id);
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [userData]);

  const dateHandler = (date) => {
    const dateObj = new Date(date);
    return `${format(dateObj, "EEE do MMMM")} at ${format(dateObj, "h:m aaa")}`;
  };

  return (
    <div className="Profile">
      <main className="profile-main">
        <section className="profile-details">
          <h1>User Details</h1>
          <div className="profile-details-item">
            <div className="profile-details-label">Name:</div>
            <div className="profile-details-detail">{userData.first_name + " " + userData.last_name}</div>
          </div>
          <div className="profile-details-item">
            <div className="profile-details-label">Email:</div>
            <div className="profile-details-detail">{userData.email}</div>
          </div>
          <div className="profile-details-item">
            <button className="profile-details-create-admin">Create Admin</button>
          </div>
        </section>
        <section className="profile-orders">
          <h1>Orders</h1>
          <table>
            {eventData.map((event) => (
              <tr className="profile-orders-tr" key={event.TICKET_ID}>
                <Link to={`/event/${event.EVENT_ID}`} className="profile-orders-table-links">
                <td className="profile-orders-td">
                  
                  <div>
                    <div className="event-card-name">{event.EVENT_NAME}</div>
                    <div className="event-card-date">
                      {dateHandler(event.DATE)}
                    </div>
                    <div className="event-card-date">
                      {event.EVENT_LOCATION}
                    </div>
                    <div className="event-card-date profile-orders-booking-date">
                      Booked At: {dateHandler(event.TIMESTAMP)}
                    </div>
                    <div className="event-card-price">
                      {`${event.TICKET_TYPE.toUpperCase()} - KShs. ${
                        event.TICKET_PRICE
                      }`}
                    </div>
                  </div>
                  
                </td>
                </Link>
              </tr>
            ))}
          </table>
        </section>
      </main>
    </div>
  );
};

export default Profile;
