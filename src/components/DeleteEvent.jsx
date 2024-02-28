import { Dialog } from "@mui/material";
import { Close } from "@mui/icons-material";
import "../styles/DeleteEvent.css";

const DeleteEvent = ({ dialogToggler, dialogOpen, deleteEvent }) => {
  return (
    <Dialog open={dialogOpen}>
      <div className="delete-event">
        <div className="delete-event-close-cont">
          <button onClick={dialogToggler} className="delete-event-close-btn">
            <Close />
          </button>
        </div>
        <div className="delete-event-body">
          Are you sure you want to delete this event?
        </div>
        <button className="delete-event-delete-btn" onClick={deleteEvent}>Delete</button>
      </div>
    </Dialog>
  );
};

export default DeleteEvent;
