import React from 'react'
import { Component } from 'react';
import s from './ContactForm.module.css'

class ContactForm extends Component {
  state = { name: "", number: "" };

  onChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  submitHandler = e => {
    e.preventDefault();
    this.props.onSubmit({ ...this.state });
    this.setState({ name: "", number: "" });
  };

  render() {
    return (
      <form onSubmit={this.submitHandler} className={s.form}>
        <label className={s.label}>
          Name
          <input  
            name="name"
            type="text"
            value={this.state.name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            onChange={this.onChangeHandler}
            className={s.input}
            required
          />
        </label>
        <label className={s.label}>
          Number
          <input        
            name="number"
            type="tel"
            value={this.state.number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            onChange={this.onChangeHandler}
            className={s.input}
            required
          />
        </label>
        <button type="submit" className={s.button}> Add contact</button>
      </form>
    );
  }
}

export default ContactForm