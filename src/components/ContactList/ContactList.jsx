import PropTypes from 'prop-types';
import css from './ContactList.module.css';

export const ContactList = ({ contacts, filterValue, deleteContact }) => {
  return (
    <ul>
      {contacts
        .filter(contact =>
          contact.name.toLowerCase().includes(filterValue.toLowerCase())
        )
        .map(contact => (
          <li key={contact.id}>
            <span className={css.contactName}>{contact.name}: </span>
            <span className={css.contactNumber}>{contact.number}</span>
            <button className={css.button} id={contact.id} onClick={deleteContact}>
              Delete
            </button>
          </li>
        ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  filterValue: PropTypes.string,
  deleteContact: PropTypes.func,
};
