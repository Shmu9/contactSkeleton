import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ContactList from './components/ContactList';
import apiGet from './api';
import LinearProgress from '@mui/material/LinearProgress';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(contacts.length === 0);

	const fetchAllContacts = async () => {
		const resp = await apiGet('/users');
		if ('error' in resp) return;
		resp.sort((a, b) => a.name.localeCompare(b.name));

		setContacts(resp);
    setLoading(false);
	}

	useEffect(() => {
		fetchAllContacts();
	}, []);



  return (
    <div className="App">
      <Header onSearchTermChange={setSearchTerm}/>
      {loading ? (
        <LinearProgress/>
      ) : (
        <ContactList
          contacts={contacts}
          searchTerm={searchTerm}
        />
      )}
    </div>
  );
}

export default App;
