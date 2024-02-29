import { useParams } from "react-router-dom";
import "../styles/Profile.css";
import { useState } from "react";
const Profile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({
    user_id: null,
    first_name: "",
    last_name: "",
    email: "",
    is_admin: false,
  });
  return (
    <div className="Profile">
      <main className="profile-main">
        <div className="profile-details">User Details</div>
        <section className="profile-orders">Orders</section>
      </main>
    </div>
  );
};

export default Profile;
