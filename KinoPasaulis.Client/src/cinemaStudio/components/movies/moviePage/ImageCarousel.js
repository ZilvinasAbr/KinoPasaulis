import React from 'react';
import { Carousel } from 'react-bootstrap';

const renderCarouselImage = (image, index) => (
  <Carousel.Item key={index}>
    <img alt={image.title} src={`/uploads/${image.url}`} />
    <Carousel.Caption>
      <h3>{image.title}</h3>
      <p>{image.description}</p>
    </Carousel.Caption>
  </Carousel.Item>
);

const ImageCarousel = ({images}) => (
  <Carousel>
    {images.map(renderCarouselImage)}
  </Carousel>
);

export default ImageCarousel;