import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    event_name: "",
    event_location: "",
    vip_ticket_price: "",
    regular_ticket_price: "",
    max_attendees: "",
    event_desc: "",
    date: "",
  });
  const formSubmit = async (e) => {
    e.preventDefault()
    try {
      const request = await fetch("http://localhost:8080/ticket-booking/php/events.php", {
        method: "POST",        
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData),
      })
      const response = await request.json();
      console.log(response)
      setFormData({
        event_name: "",
        event_location: "",
        vip_ticket_price: "",
        regular_ticket_price: "",
        max_attendees: "",
        event_desc: "",
        date: "",
      })

    } catch (err) {
      console.log(err)
    }

  };

  const formChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  return (
    <>
      <form action="" onSubmit={formSubmit}>
        <div>
          <label htmlFor="event_name">Name</label>
          <input
            type="text"
            name="event_name"
            onChange={formChange}
            value={formData.event_name}
          />
        </div>
        <div>
          <label htmlFor="event_location">Location</label>
          <input
            type="text"
            name="event_location"
            onChange={formChange}
            value={formData.event_location}
          />
        </div>
        <div>
          <label htmlFor="vip_ticket_price">Vip Ticket Price</label>
          <input
            type="text"
            name="vip_ticket_price"
            onChange={formChange}
            value={formData.vip_ticket_price}
          />
        </div>
        <div>
          <label htmlFor="regular_ticket_price">Regular Ticket Price</label>
          <input
            type="text"
            name="regular_ticket_price"
            onChange={formChange}
            value={formData.regular_ticket_price}
          />
        </div>
        <div>
          <label htmlFor="max_attendees">Max Attendees</label>
          <input
            type="text"
            name="max_attendees"
            onChange={formChange}
            value={formData.max_attendees}
          />
        </div>
        <div>
          <label htmlFor="event_desc">Event Description</label>
          <input
            type="text"
            name="event_desc"
            onChange={formChange}
            value={formData.event_desc}
          />
        </div>
        <div>
          <label htmlFor="date">Date and Time</label>
          <input
            type="datetime-local"
            name="date"
            onChange={formChange}
            value={formData.date}
          />
        </div>
        <button>Submit</button>
      </form>
    </>
  );
}

export default App;
