import React, { Component } from 'react';
import './ImageGallery.css';
import ImageGalleryItem from 'Components/ImageGalleryItem/';
import Button from 'Components/Button/';
import Modal from 'Components/Modal/Modal';
import Loader from 'Components/Loader/Loader';
import { toast } from 'react-toastify';
import galleryFetch from 'Components/api/fetch';
import propTypes, { array } from 'prop-types';

class ImageGallery extends Component {
  state = {
    gallery: null,
    modalData: {},
    modalState: false,
    status: 'empty',
    page: 1,
    error: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevRequest = prevProps.request;
    const currentRequest = this.props.request;
    const { modalState, page } = this.state;

    if (prevRequest !== currentRequest) {
      this.setState({ status: 'loading', page: 1, gallery: null });
      setTimeout(() => {
        galleryFetch(currentRequest, page)
          .then(response => {
            const gallery = response.hits;
            this.setState({ gallery });
          })
          .catch(error => this.setState({ error }))
          .finally(this.setState({ status: 'recieve' }));
      }, 1000);
    }

    if (prevState.page !== page) {
      galleryFetch(currentRequest, page).then(response => {
        const newGallery = response.hits;
        this.setState({ gallery: [...prevState.gallery, ...newGallery] });
      });
    }

    if (modalState === true) {
      window.addEventListener('click', this.galleryPageKeyboardClose);
    }

    if (modalState === false) {
      window.removeEventListener('click', this.galleryPageKeyboardClose);
    }
  }

  // load more page logic
  onLoadMoreClick = num => {
    const { page } = this.state;

    this.setState(prevState => ({
      page: prevState.page + num,
    }));
  };

  //  modal logic
  galleryPageKeyboardClose = e => {
    if (e.target.tagName !== 'IMG') {
      this.closeModal();
    }
  };

  onImageModalOpen = e => {
    const imgAlt = e.target.alt;
    const imgRef = e.target.dataset.img;

    this.setState({ modalData: { imgRef, imgAlt } });
    this.openModal();
  };

  openModal = () => {
    this.setState({ modalState: true });
  };

  closeModal = () => {
    this.setState({ modalState: false });
  };

  render() {
    const { gallery, modalData, modalState, status, error } = this.state;

    if (error !== '') {
      toast.warn(error);
      this.setState({ error: '' });
    }

    if (status === 'recieve') {
      return (
        <>
          <ul className="ImageGallery" onClick={this.onImageModalOpen}>
            {<ImageGalleryItem data={gallery} />}
          </ul>
          <Button onLoadMoreClick={this.onLoadMoreClick} />
          {modalState && (
            <Modal closeModal={this.closeModal}>
              <img src={modalData.imgRef} alt={modalData.imgAlt} />
            </Modal>
          )}
        </>
      );
    }

    if (status === 'loading') {
      return (
        <div className="ImageGallery__loader">
          <Loader />
        </div>
      );
    }
  }
}

ImageGallery.propTypes = {
  gallery: propTypes.array,
  modalData: propTypes.oneOfType([propTypes.string, propTypes.number]),
};

export default ImageGallery;
