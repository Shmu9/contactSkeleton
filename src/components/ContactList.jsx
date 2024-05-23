import React, { useState, useEffect } from 'react';
import ContactCard from './ContactCard';
import Divider from '@mui/material/Divider';


const ContactList = ({ contacts, searchTerm }) => {
	const [numContacts, setNumContacts] = useState(contacts.length);

	useEffect(() => {
		// count number of matching contacts
		let cs = contacts.filter((c) => {
			return searchTerm.length === 0 ||
						 c.name.toLowerCase().includes(searchTerm.toLowerCase());
			});
		setNumContacts(cs.length);
	}, [contacts, searchTerm]);

	let lastLetter = "";
	const isNewLetter = (name) => {
		return (name[0] !== lastLetter);
	}

	// contacts should already be sorted
	// group contacts by their starting letter/initial
	let l = 0;
	let r = 1;
	if (contacts.length !== 0) lastLetter = contacts[0].name[0];
	const contactsPerInitial = [];
	while (r < contacts.length) {
		if (r === contacts.length || isNewLetter(contacts[r].name[0])) {
			contactsPerInitial.push(contacts.slice(l, r));
			l = r;
		}
		r++;
	}

	return (
		<div className='ContactList-container responsive-pad'>
			{contactsPerInitial.map((cs, index) => {
				// retain only contacts that match search term
				cs = cs.filter((c) => {
					return searchTerm.length === 0 ||
									c.name.toLowerCase().includes(searchTerm.toLowerCase());
					})
				// console.log(cs);
				if (cs.length > 0) {
					const letter = cs[0].name[0];
					return (
						<div key={index} className='ContactList-letter-group'>
							<Divider
								flexItem={true}
								textAlign='left'
								sx={{
									fontSize: '48px',
									textDecoration: 'bold',
									width: '100%',
									opacity: '100%',
									color: 'white',
									margin: `${index ? '50px' : '10px'} 0 10px 0` // small margin for first divider
								}}
							>
								{/* <Chip 
									label={letter.toUpperCase()} 
									size="small"
									sx={{
										width: '32px',
										color: 'white',
										backgroundColor: 'lightgrey',
									}}
								/> */}
								{letter.toUpperCase()}
							</Divider>
							<div className='ContactList-letter-group-contacts'>
								{cs.map((c) => (<ContactCard key={c.id} contact={c}/>))}
							</div>
						</div>
					)
				} else {
					return (
						<></>
					)
				}
			})}
			<h3 style={{
				color: 'white',
				fontSize: '24px'
			}}>
				{`${numContacts} Contacts Found`}
			</h3>
		</div>
	)
}

export default ContactList;