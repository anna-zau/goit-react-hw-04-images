import { useState } from 'react';
import PropTypes from 'prop-types';

import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';

import {
  SearchBarTag,
  SearchForm,
  SearchBtn,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onFormSubmit }) => {
  const [search, setSearch] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();

    if (search.trim() === '') {
      toast.warn('Please enter something for picture search', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    }

    onFormSubmit(search);
    setSearch('');
  };

  const inputChange = evt => {
    setSearch(evt.currentTarget.value);
  };

  return (
    <SearchBarTag>
      <SearchForm onSubmit={handleSubmit}>
        <SearchBtn type="submit" className="button">
          <BsSearch />
        </SearchBtn>

        <SearchFormInput
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={search}
          onChange={inputChange}
        />
      </SearchForm>
    </SearchBarTag>
  );
};

Searchbar.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};
