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

  useEffect(() => {
    fetchUser(id);
  }, []);

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
