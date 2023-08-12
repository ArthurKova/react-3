const KEY = '38777949-9fd3a86c95b2ce83099656e1b';

const fetch = currentRequest => {
  fetch(
    `https://pixabay.com/api/?key=${KEY}&q=${currentRequest}&page=1$&image_type=photo&orientation=horizontal&per_page=12`
  );
};

export default fetch;
