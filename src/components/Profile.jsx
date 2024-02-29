import { useParams } from "react-router-dom";
import "../styles/Profile.css";
import { useEffect, useState } from "react";
import "../styles/EventCard.css";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import SignUp from "./SignUp";
import { Dialog } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Profile = ({ loggedIn }) => {
  const { id } = useParams();
  const navigate = useNavigate();
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
      TICKET_ID: "",
      TICKET_PRICE: "",
      TICKET_TYPE: "",
      TIMESTAMP: Date.now(),
    },
  ]);
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);

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
      console.log(response);

      if (response.message) {
        setEventData([...response.message].reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const registerDialogToggler = () => {
    setRegisterDialogOpen((prevState) => !prevState);
  };

  useEffect(() => {
    fetchUser(id);
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [userData]);

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
  }, [loggedIn]);

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
            <div className="profile-details-user">
              {userData.first_name + " " + userData.last_name}
            </div>
          </div>
          <div className="profile-details-item">
            <div className="profile-details-email">{userData.email}</div>
          </div>
          {userData.is_admin ? (
            <div className="profile-details-item">
              <button
                className="profile-details-create-admin"
                onClick={registerDialogToggler}
              >
                Create Admin
              </button>
            </div>
          ) : (
            ""
          )}
        </section>
        <section className="profile-orders">
          <h1>Orders</h1>
          <table>
            <tbody>
              {eventData.map((event) => (
                <tr className="profile-orders-tr" key={event.TICKET_ID}>
                  <Link
                    to={`/event/${event.EVENT_ID}`}
                    className="profile-orders-table-links"
                  >
                    <td className="profile-orders-td">
                      <div>
                        <div className="event-card-name">
                          {event.EVENT_NAME}
                        </div>
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
            </tbody>
          </table>
        </section>
        <Dialog open={registerDialogOpen}>
          <div className="profile-register-admin-dialog">
            <div className="profile-register-close-cont">
              <button
                onClick={registerDialogToggler}
                className="profile-register-dialog-close"
              >
                <Close />
              </button>
            </div>
            <SignUp is_admin={userData.is_admin} />
          </div>
        </Dialog>
      </main>
    </div>
  );
};

export default Profile;
