import React, { useState, useEffect } from 'react';
import { 
  Avatar,
  // Modal,
  // Fade,
  // Box,
  // Typography,
  // Backdrop
} from '@mui/material';
import ContactModal from './ContactModal'

import EmailIcon from '@mui/icons-material/Email';

const ContactCard = ({ contact }) => {
  const [pfp, setPfp] = useState("");

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

  // open new mailto tab of contact
  const sendMail = (event) => {
    event.preventDefault();
    const newWindow = window.open(`mailto:${contact.email}`, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null;
  }

	return (
		<div className='ContactCard-container'>
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
      <div className='ContactCard-modal'>
        <ContactModal contact={contact}/>
      </div>
    </div>
	)
}

export default ContactCard;