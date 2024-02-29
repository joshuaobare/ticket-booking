import { useParams } from "react-router-dom";
import "../styles/Profile.css";
import { useEffect, useState } from "react";

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
      DATE: "",
      EVENT_DESC: "",
      EVENT_LOCATION: "",
      EVENT_NAME: "",
      IMAGE: "",
      TICKET_PRICE: "",
      TICKET_TYPE: "",
      TIMESTAMP: "",
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

      if (response.message) {
        setEventData(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(eventData);

  useEffect(() => {
    fetchUser(id);
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [userData]);

  return (
    <div className="Profile">
      <main className="profile-main">
        <section className="profile-details">
          <h1>User Details</h1>
          <div className="profile-details-item">
            <div>Name</div>
            <div>{userData.first_name + " " + userData.last_name}</div>
          </div>
          <div className="profile-details-item">
            <div>Email</div>
            <div>{userData.email}</div>
          </div>
        </section>
        <section className="profile-orders">
          <h1>Orders</h1>
          <table>
            {eventData.map((event) => (
              <tr>
                <td>
                    <div>
                        <div>{event.EVENT_NAME}</div>
                    </div>
                </td>
                
                <td>{event.DATE}</td>
                <td>{event.EVENT_DESC}</td>
                <td>{event.EVENT_LOCATION}</td>
                <td>{event.TICKET_PRICE}</td>
                <td>{(event.TICKET_TYPE).toUpperCase()}</td>
                <td>{event.TIMESTAMP}</td>                
              </tr>
            ))}
          </table>
        </section>
      </main>
    </div>
  );
};

export default Profile;
