import React, { Component } from 'react';
import './ImageGalleryItem.css';

class ImageGalleryItem extends Component {
  render() {
    if (this.props.data) {
      const { hits } = this.props.data;
      return hits.map(hit => {
        const { id, largeImageURL, webformatURL, tags } = hit;

        return (
          <li className="ImageGalleryItem" key={id}>
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

export default ImageGalleryItem;
