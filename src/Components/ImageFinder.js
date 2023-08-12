import React, { Component } from 'react';
import './ImageFinder.css';
import Searchbar from './Searchbar/';
import ImageGallery from './ImageGallery/';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class ImageFinder extends Component {
  state = {
    value: '',
  };

  onSubmit = props => {
    this.setState({ value: props });
  };

  render() {
    const { value } = this.state;
    return (
      <div>
        <ToastContainer autoClose={2000} />
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery request={value} />
      </div>
    );
  }
}
