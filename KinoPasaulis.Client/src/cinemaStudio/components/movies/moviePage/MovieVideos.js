import React from 'react';
import { Col, Row } from 'react-bootstrap';

const MovieVideos = ({videos}) => (
  <div>
    {videos.map((video, index) => (
      <Row key={index}>
        <Col xs={10} xsOffset={1} sm={8} smOffset={2} md={6} mdOffset={3} lg={8} lgOffset={2}>
          <iframe
            width="100%"
            height="400px"
            src={video.url.replace("watch?v=", "v/")}
            allowFullScreen
          >
          </iframe>
        </Col>

      </Row>
    ))}
  </div>
);

export default MovieVideos;