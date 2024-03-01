import { useState } from "react";
import "../styles/EventCard.css";
import { Dialog } from "@mui/material";
import "../styles/CreateEvent.css";
import { Close } from "@mui/icons-material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// entry point = UserHome component
function CreateEvent({ dialogOpen, dialogToggler, fetchEvents }) {
  const [formData, setFormData] = useState({
    event_name: "",
    event_location: "",
    vip_ticket_price: "",
    regular_ticket_price: "",
    max_attendees: "",
    event_desc: "",
    date: "",
  });
  const [image, setImage] = useState("");

  // theme and fullScreen are material-ui objects that make the dialog responsive
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  // This function takes a file object as input and returns a promise that resolves
  // with the base64 representation of the file.
  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        // Create a new FileReader object to read the contents of the file.
        const reader = new FileReader();      
        // Read the file as a data URL, which represents the file's data as a base64 encoded string.
        reader.readAsDataURL(file);      
        // Event handler for when the reading operation is completed successfully.
        reader.onload = () => {
            // Resolve the promise with the base64 data URL.
            resolve(reader.result);
        };      
        // Event handler for when an error occurs during the reading operation.
        reader.onerror = (error) => {
            // Reject the promise with the encountered error.
            reject(error);
        };
    });
  }

  // image change handler function
  const handleImage = async (e) => {
    setImage(await convertToBase64(e.target.files[0]));
  };

  // form submission handler function
  const formSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const request = await fetch(
        "https://ticketflow-booking.000webhostapp.com/php/events.php",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ ...formData, image }),
        }
      );
      const response = await request.json();

      // if submission is successful, toggle dialog and reset formData state
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
        fetchEvents();
        dialogToggler();
      }
    } catch (err) {
      console.log(err);
    }
  };

  // form input change handler function
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
    <Dialog open={dialogOpen} fullScreen={fullScreen}>
      <div className="create-event-cont">
        <div className="create-event-header">
          <h2 className="create-event-heading">Create Event</h2>
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
            <label
              htmlFor="event_name"
              className="create-event-form-item-label"
            >
              Name
            </label>
            <input
              type="text"
              name="event_name"
              onChange={formChange}
              value={formData.event_name}
              required
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
              required
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
              type="number"
              name="vip_ticket_price"
              onChange={formChange}
              value={formData.vip_ticket_price}
              required
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
              type="number"
              name="regular_ticket_price"
              onChange={formChange}
              value={formData.regular_ticket_price}
              required
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
              type="number"
              name="max_attendees"
              onChange={formChange}
              value={formData.max_attendees}
              required
            />
          </div>
          <div className="create-event-form-item">
            <label
              htmlFor="event_desc"
              className="create-event-form-item-label"
            >
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
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <button className="create-event-form-submit-btn">Submit</button>
        </form>
      </div>
    </Dialog>
  );
}

export default CreateEvent;
