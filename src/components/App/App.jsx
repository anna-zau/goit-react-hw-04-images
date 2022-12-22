import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchImages } from '../../services/api';

import { Searchbar } from '../Searchbar/Searchbar';
import { AppClass } from './App.style';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';

export const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    if (!searchValue) {
      return;
    }

    setLoading(true);
    fetchImages(searchValue, page)
      .then(data => {
        setImages(prevState => {
          return [...prevState, ...data.data.hits];
        });
        setShowBtn(page < Math.ceil(data.data.total / 12));
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, [searchValue, page]);

  const receiveSearchValue = search => {
    setSearchValue(search);
    setPage(1);
    setImages([]);
  };

  const openModalWithLargeImage = url => {
    setLargeImageURL(url);
  };

  const onClickLoadMoreBtn = () => {
    setPage(prevState => {
      return prevState + 1;
    });
  };

  const onCloseModal = () => {
    setLargeImageURL(null);
  };

  return (
    <AppClass>
      <Searchbar onFormSubmit={receiveSearchValue} />
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={openModalWithLargeImage} />
      )}

      {loading && <Loader />}
      {error && <h3>{error}</h3>}

      {showBtn && <Button onBtnClick={onClickLoadMoreBtn} loading={loading} />}
      {largeImageURL && (
        <Modal onCloseModal={onCloseModal} largeImageURL={largeImageURL} />
      )}
      <ToastContainer />
    </AppClass>
  );
};
