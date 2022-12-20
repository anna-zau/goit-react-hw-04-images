import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import { Overlay, ModalDiv } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onCloseModal, largeImageURL }) => {
  const onOverlayClick = evt => {
    if (evt.currentTarget === evt.target) {
      onCloseModal();
    }
  };

  const onPressExit = evt => {
    if (evt.code === 'Escape') {
      onCloseModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onPressExit);

    return () => {
      window.removeEventListener('keydown', onPressExit);
    };
  });

  return createPortal(
    <Overlay onClick={onOverlayClick}>
      <ModalDiv>
        <img src={largeImageURL} alt="Large_image" />
      </ModalDiv>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
