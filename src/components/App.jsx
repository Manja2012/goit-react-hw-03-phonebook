import React, { Component } from 'react'
import PropTypes from 'prop-types';

import shortid from 'shortid';

import ContactForm from './ContactForm/ContactForm.jsx';
import ContactsList from './ContactsList/ContactsList.jsx';
import Filter from './Filter/filter.jsx';

export class App extends Component{
  state = {
    contacts: [],
    filter: '',
  };

  addContact = data => {
    const newContact = { ...data, id: shortid.generate() }; 
    if (
      this.state.contacts
        .map(contact => contact.name.toLowerCase())
        .includes(data.name.toLowerCase())
    ) {
      alert(`${data.name} is already in contacts`);
    } else {
      this.setState(prevState => ({
        contacts: [newContact, ...prevState.contacts],
      }));
    }
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  onChangeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFiltredContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(cont =>
      cont.name.toLowerCase().includes(normalizedFilter)
    );
  };

  componentDidUpdate(prevProps, prevState){
    if (this.state.contacts !== prevState.contacts) {
        localStorage.setItem('contacts', JSON.stringify(this.state.contacts)); 
    }
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedСontacts = JSON.parse(contacts);
    if (parsedСontacts) {
      this.setState({ contacts: parsedСontacts });
    }
  }

  render() {

    return (
    
  <div>
    <h1>Phonebook</h1>
    <ContactForm onSubmit={this.addContact} />
    <h2>Contacts</h2>
    <Filter value={this.state.filter} onChange={this.onChangeFilter} />
    <ContactsList
      contacts={this.getFiltredContacts()}
      remoteContact={this.deleteContact}
    />
  </div> 
       
      

    );
  }
};

App.propTypes = {
  contacts: PropTypes.array,
};
export default App;