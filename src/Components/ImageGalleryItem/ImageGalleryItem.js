import React, { Component } from 'react';
import propTypes from 'prop-types';
import './ImageGalleryItem.css';

class ImageGalleryItem extends Component {
  render() {
    const { data } = this.props;
    if (data) {
      return data.map(hit => {
        const { id, largeImageURL, webformatURL, tags } = hit;

        return (
          <li className="ImageGalleryItem" key={tags + id}>
            <img
              src={webformatURL}
              alt={tags}
              className="ImageGalleryItem-image"
              data-img={largeImageURL}
            />
          </li>
        );
      });
    }
  }
}

ImageGalleryItem.propTypes = {
  data: propTypes.array,
};

export default ImageGalleryItem;
