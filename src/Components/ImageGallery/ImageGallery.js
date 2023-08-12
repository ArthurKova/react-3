import React, { Component } from 'react';
import './ImageGallery.css';
import ImageGalleryItem from 'Components/ImageGalleryItem/';
import Button from 'Components/Button/';
import { Oval } from 'react-loader-spinner';
import Modal from 'Components/Modal/Modal';
import Loader from 'Components/Loader/Loader';

const KEY = '38777949-9fd3a86c95b2ce83099656e1b';

class ImageGallery extends Component {
  state = {
    gallery: null,
    modalData: {},
    modalState: false,
    status: 'empty',
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevRequest = prevProps.request;
    const currentRequest = this.props.request;
    const currentModalState = this.state.modalState;
    const { page } = this.state.page;

    if (prevRequest !== currentRequest) {
      this.setState({ status: 'loading', page: 1, gallery: null });
      setTimeout(() => {
        fetch(
          `https://pixabay.com/api/?key=${KEY}&q=${currentRequest}&page=${page}$&image_type=photo&orientation=horizontal&per_page=12`
        )
          .then(response => response.json())
          .then(gallery => this.setState({ gallery }))
          .finally(this.setState({ status: 'recieve' }));
      }, 1000);
    }

    // if (prevState.page !== page) {
    //   this.setState({ status: 'loading' });
    //   setTimeout(() => {
    //     fetch(
    //       `https://pixabay.com/api/?key=${KEY}&q=${currentRequest}&page=2}$&image_type=photo&orientation=horizontal&per_page=12`
    //     )
    //       .then(response => response.json())
    //       .then(gallery => this.setState({ gallery }))
    //       .finally(this.setState({ status: 'recieve' }));
    //   }, 1000);
    // }

    if (currentModalState === true) {
      window.addEventListener('click', this.galleryPageKeyboardClose);
    }

    if (currentModalState === false) {
      window.removeEventListener('click', this.galleryPageKeyboardClose);
    }
  }
  // load more page logic
  onLoadMoreClick = num => {
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
    const { gallery, modalData, modalState, status } = this.state;

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

export default ImageGallery;
