import React, { Component } from 'react';
// import { nanoid } from 'nanoid';
import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      // { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      // { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      // { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      // { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  checkName = newContact => {
    const { contacts } = this.state;
    const isNameOneList = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    return isNameOneList;
  };

  checkNumber = newContact => {
    const { contacts } = this.state;
    const isNumberOnList = contacts.some(
      contact => contact.number === newContact.number
    );
    return isNumberOnList;
  };

  addNewContact = newContact => {
    const isNameOneList = this.checkName(newContact);
    const isNumberOnList = this.checkNumber(newContact);
    const { contacts } = this.state;

    if (isNameOneList) {
      alert(`${newContact.name} is already in contacts`);
    } else if (isNumberOnList) {
      alert(`This number ${newContact.number} is already in contacts`);
    } else {
      this.setState({ contacts: [...contacts, newContact] });
    }
  };

  addFilterValue = e => {
    this.setState({ filter: e.target.value });
  };

  deleteContact = e => {
    const { contacts } = this.state;
    const newContacts = contacts.filter(contact => contact.id !== e.target.id);
    this.setState({ contacts: newContacts });
  };

  componentDidMount() {
    const list = window.localStorage.getItem('contact');
    if (!list) return;
    try {
      this.setState({
        contacts: JSON.parse(list),
      });
    } catch (e) {
      console.error(e);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      const ContactStringified = JSON.stringify(this.state.contacts);
      window.localStorage.setItem('contact', ContactStringified);
    }
  }

  render() {
    return (
      <>
        <Section title="Phonebook">
          <ContactForm handleSubmit={this.addNewContact} />
        </Section>
        <Section title="Contacts">
          <Filter addFilterValue={this.addFilterValue} />
          <ContactList
            contacts={this.state.contacts}
            filterValue={this.state.filter}
            deleteContact={this.deleteContact}
          />
        </Section>
      </>
    );
  }
}
