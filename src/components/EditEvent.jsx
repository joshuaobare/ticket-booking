import { useState } from "react";
import "../styles/EventCard.css";
import { Dialog } from "@mui/material";
import "../styles/CreateEvent.css";
import { Close } from "@mui/icons-material";

function EditEvent({ dialogOpen, dialogToggler, fetchEvent }) {
  const [formData, setFormData] = useState({
    event_name: "",
    event_location: "",
    vip_ticket_price: "",
    regular_ticket_price: "",
    max_attendees: "",
    event_desc: "",
    date: "",    
  });
  const [image, setImage] = useState("")

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  }
  const handleImage = async (e) => {
    setImage(await convertToBase64(e.target.files[0]));
  }

  const formSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData));
    try {
      const request = await fetch(
        "http://localhost:8080/ticket-booking/php/events.php",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({...formData, image}),
        }
      );
      const response = await request.json();
      
      if (response.message) {
        setFormData({
          event_name: "",
          event_location: "",
          vip_ticket_price: "",
          regular_ticket_price: "",
          max_attendees: "",
          event_desc: "",
          date: "",        
        });
        fetchEvent()
        dialogToggler()
      }
      
    } catch (err) {
      console.log(err);
    }
  };
  
  const formChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData((prevState) => {
      return {
        ...prevState,
        [name]:
          type === "file"
            ? new Blob([files[0]], {
                type: "application/json",
              })
            : value,
      };
    });
  };
  return (
    <Dialog open={dialogOpen}>
      <div className="create-event-header">
        <h2 className="create-event-heading">Edit Event</h2>
        <button className="create-event-close" onClick={dialogToggler}>
          <Close />
        </button>
      </div>

      <form
        action=""
        method="post"
        onSubmit={formSubmit}
        className="create-event-form"
      >
        <div className="create-event-form-item">
          <label htmlFor="event_name" className="create-event-form-item-label">
            Name
          </label>
          <input
            type="text"
            name="event_name"
            onChange={formChange}
            value={formData.event_name}
          />
        </div>
        <div className="create-event-form-item">
          <label
            htmlFor="event_location"
            className="create-event-form-item-label"
          >
            Location
          </label>
          <input
            type="text"
            name="event_location"
            onChange={formChange}
            value={formData.event_location}
          />
        </div>
        <div className="create-event-form-item">
          <label
            htmlFor="vip_ticket_price"
            className="create-event-form-item-label"
          >
            Vip Ticket Price
          </label>
          <input
            type="text"
            name="vip_ticket_price"
            onChange={formChange}
            value={formData.vip_ticket_price}
          />
        </div>
        <div className="create-event-form-item">
          <label
            htmlFor="regular_ticket_price"
            className="create-event-form-item-label"
          >
            Regular Ticket Price
          </label>
          <input
            type="text"
            name="regular_ticket_price"
            onChange={formChange}
            value={formData.regular_ticket_price}
          />
        </div>
        <div className="create-event-form-item">
          <label
            htmlFor="max_attendees"
            className="create-event-form-item-label"
          >
            Max Attendees
          </label>
          <input
            type="text"
            name="max_attendees"
            onChange={formChange}
            value={formData.max_attendees}
          />
        </div>
        <div className="create-event-form-item">
          <label htmlFor="event_desc" className="create-event-form-item-label">
            Event Description
          </label>
          <textarea
            type="text"
            name="event_desc"
            onChange={formChange}
            value={formData.event_desc}
            id="event_desc"
          />
        </div>
        <div className="create-event-form-item">
          <label htmlFor="image" className="create-event-form-item-label">
            Poster
          </label>
          <input
            type="file"
            name="image"
            accept=".jpg, .png, .jpeg, .gif"
            onChange={handleImage}
          />
        </div>
        <div className="create-event-form-item">
          <label htmlFor="date" className="create-event-form-item-label">
            Date and Time
          </label>
          <input
            type="datetime-local"
            name="date"
            onChange={formChange}
            value={formData.date}
          />
        </div>
        <button className="create-event-form-submit-btn">Submit</button>
      </form>
    </Dialog>
  );
}

export default EditEvent;
