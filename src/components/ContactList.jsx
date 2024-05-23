import React, { useState, useEffect } from 'react';
import apiGet from '../api';
import ContactCard from './ContactCard';
import { Skeleton, Grid, Chip } from '@mui/material';
import VSC_icon from '../VSC_icon.png';
import Divider from '@mui/material/Divider';


const ContactList = ({ contacts, searchTerm }) => {
	const [numContacts, setNumContacts] = useState(contacts.length);

	useEffect(() => {
		let cs = contacts.filter((c) => {
			return searchTerm.length === 0 ||
						 c.name.toLowerCase().includes(searchTerm.toLowerCase());
			});
		setNumContacts(cs.length);
	}, [contacts, searchTerm]);

	const segmented = () => {
		let lastLetter = "";
		const isNewLetter = (name) => {
			return (name[0] !== lastLetter);
		}

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

		console.log(contactsPerInitial);

		// contacts should already be sorted
		// group contacts by their starting letter/initial
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
									textAlign="left"
									sx={{
										fontSize: "48px",
										textDecoration: "bold",
										width: "100%",
										opacity: "100%",
										color: 'white',
										margin: `${index ? "50px" : "10px"} 0 10px 0` // small margin for first divider
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
					fontSize: "24px"
				}}>
					{`${numContacts} Contacts Found`}
				</h3>
			</div>
		)
	}

	return segmented();


	// return (
	// 	<div className='ContactList-container responsive-pad'>
	// 		{contacts.filter((c) => {
	// 		return searchTerm.length === 0 ||
	// 					 c.name.toLowerCase().includes(searchTerm.toLowerCase());
	// 		}).map((c, index) => {
	// 			const letter = c.name[0];
	// 			return (
	// 				<div key={index}>
	// 					{isNewLetter(letter) ? (
	// 						<Divider
	// 						flexItem={true}
	// 						textAlign="left"
	// 						sx={{
	// 							// color: "white",
	// 						}}
	// 					>
	// 						{letter.toUpperCase()}
	// 					</Divider>
	// 					) : (
	// 						<></>
	// 					)}
	// 					<ContactCard key={c.id} contact={c}/>
	// 				</div>
	// 			)
	// 		})}
	// 	</div>
	// )
}

export default ContactList;