import { Dialog } from "@mui/material"

const DeleteEvent = ({deleteDialogToggler , dialogOpen}) => {
return (
    <Dialog open={dialogOpen}>
        <div>Are you sure you want to delete this event?</div>
        <button>Delete</button>
    </Dialog>
)
}

export default DeleteEvent