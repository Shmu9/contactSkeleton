import React, { useState, useEffect } from 'react';
import apiGet from '../api';
import ContactCard from './ContactCard';
import { Skeleton } from '@mui/material';
import VSC_icon from '../VSC_icon.png';

const ContactList = ({ contacts, searchTerm }) => {
	return (
		<div className='ContactList-container'>
		{contacts.filter((c) => {
			return searchTerm.length > 0 
				? c.name.toLowerCase().includes(searchTerm.toLowerCase())
				: true;
			}).map((c) => {
				return (
					<ContactCard key={c.id} contact={c}></ContactCard>
				)
			})}
		</div>
	)
}

export default ContactList;