import { Component } from 'react';
import { nanoid } from 'nanoid';
import * as storage from './components/services/localStorage';
import ContactForm from './components/ContactForm/ContactForm';
import { ContactList } from './components/ContactList/ContactList';
import { Filter } from './components/Filter/Filter';
import s from './App.module.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const localContacts = storage.get('contacts');
    if (localContacts) {
      this.setState({ contacts: localContacts });
    } else {
      storage.save('contacts', this.state.contacts);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      storage.save('contacts', this.state.contacts);
    }
  }

  submitHandler = ({ name, number }) => {
    const contactToAdd = {
      id: nanoid(),
      name,
      number,
    };

    if (
      this.state.contacts.some(
        contact =>
          contact.name.toLowerCase() === contactToAdd.name.toLowerCase(),
      )
    ) {
      return alert(`${contactToAdd.name} is already in contacts!`);
    } else {
      this.setState(({ contacts }) => {
        return { contacts: [contactToAdd, ...contacts] };
      });
    }
  };

  flterContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };
  onChangeFilter = e => this.setState({ filter: e.target.value });

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    return (
      <section className={s.section}>
        <h1 className={s.title}>Phonebook</h1>
        <ContactForm onSubmit={this.submitHandler} />
        <h2 className={s.title}>Contacts</h2>
        <Filter onChange={this.onChangeFilter} value={this.state.filter} />
        <ContactList
          filterContacts={this.flterContacts()}
          onDeleteContacts={this.deleteContact}
        />
      </section>
    );
  }
}

export default App;
