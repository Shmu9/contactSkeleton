import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import {
  Email,
  More,
  Phone,
  Home,
  Language
} from '@mui/icons-material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '300px',
  height: '180px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ContactModal = ({ contact }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <More sx={{ width: "36px", height: "36px" }} onClick={handleOpen}/>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {contact.name}
            </Typography>
            <Typography id="transition-modal-description">
              <ul>
                <div className='ContactCard-modal-detail'>
                  <Email/>
                  {contact.email}
                </div>
                <div className='ContactCard-modal-detail'>
                  <Phone/>
                  {contact.phone}
                </div>
                <div className='ContactCard-modal-detail'>
                  <Home/>
                  {contact.address.city}
                </div>
                <div className='ContactCard-modal-detail'>
                  <Language/>
                  {contact.website}
                </div>
              </ul>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ContactModal;