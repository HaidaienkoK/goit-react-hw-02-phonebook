import React from 'react';
import PropTypes from 'prop-types';
import css from './Filter.module.css';

export const Filter = ({ addFilterValue }) => {
  return (
    <>
      <label className={css.label}>
        Find contacts by name
        <input
          className={css.input}
          type="text"
          onChange={addFilterValue}
        ></input>
      </label>
    </>
  );
};

Filter.propTypes = {
  addFilterValue: PropTypes.func,
};
