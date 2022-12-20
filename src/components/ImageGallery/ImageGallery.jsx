import React from 'react';
import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryTag } from './ImageGallery.styled.js';

export const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ImageGalleryTag>
      {images.map(image => {
        return (
          <ImageGalleryItem
            key={image.id}
            item={image}
            onImageClick={onImageClick}
          />
        );
      })}
    </ImageGalleryTag>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object.isRequired),
  onImageClick: PropTypes.func.isRequired,
};
