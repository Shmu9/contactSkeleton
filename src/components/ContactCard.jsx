import React, { useState, useEffect } from 'react';
import { 
  Avatar,
  Modal,
  Fade,
  Box,
  Typography,
  Backdrop
} from '@mui/material';
import ContactModal from './ContactModal'

import EmailIcon from '@mui/icons-material/Email';

const ContactCard = ({ contact }) => {
  const [pfp, setPfp] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const fetchPfp = async () => {
  //   const img = await apiGet(`/photos?id=${contact.id}`)
  //   if ('error' in img) return;

  //   // pretend albumId corresponds to contact.id
  //   if (img[0].albumId === img[0].id) setPfp(img[0].url);
  // }

  // useEffect(() => {
  //   // fetchPfp();
  // })

  const initials = (name) => {
    // first and last name only
    let names = name.split(' ');
    let initials = name[0][0];
    if (names.length > 1) {
      initials += names[names.length-1][0];
    }
    return initials
  }

  const sendMail = (event) => {
    event.preventDefault();
    const newWindow = window.open(`mailto:${contact.email}`, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null;
  }

	return (
		<div className='ContactCard-container' onClick={handleOpen}>
      <Avatar src={pfp} alt={initials(contact.name)} sx={{ width: 42, height: 42, margin: "0 10px 0 10px" }}>
        {pfp ? "" : initials(contact.name)}
      </Avatar>
      <div className='ContactCard-text'>
        <div className='let header'>{contact.name}</div>
        <div className='mail'>
          <EmailIcon sx={{ width: 20, height: 20, marginRight: "5px"}}/>
          <div className='hover-underline' onClick={e => sendMail(e)}>
            {contact.email}
          </div>
        </div>
      </div>
        {/* <Modal
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
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '60%',
              height: '60%',
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </Box>
          </Fade>
        </Modal> */}
      <div className='ContactCard-modal'>
        <ContactModal/>
      </div>
    </div>
	)
}

export default ContactCard;