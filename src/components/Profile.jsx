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
  const [eventData, setEventData] = useState({
    "ticket_id": "1",
    "event_id": "3",
    "user_id": "2",
    "timestamp": "2024-02-26 14:58:52",
    "ticket_price": "50000",
    "ticket_type": "vip",
    "event_name": "Rave",
    "event_location": "Kisumu",
    "vip_ticket_price": "50000",
    "regular_ticket_price": "20000",
    "max_attendees": "20",
    "event_desc": "Come Party With Us!",
    "date": "2024-02-11 18:17:00",
    "image": "/src/assets/blackbg.jpg"
})

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
      const response = await request.json()
      console.log(response)
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
        </section>
      </main>
    </div>
  );
};

export default Profile;
