import React from 'react';
import { Table, Button } from 'react-bootstrap';

const VideosTable = ({ videos, removeVideo }) => {
  function renderVideo(video, index) {
    return (
      <tr key={index}>
        <td>{video.title}</td>
        <td>{video.url}</td>
        <td>{video.description}</td>
        <td>
          <Button onClick={() => removeVideo(index)} bsStyle="danger">
            Pašalinti
          </Button>
        </td>
      </tr>
    )
  }

  return (
    <Table striped bordered condensed hover>
      <thead>
      <tr>
        <th>Pavadinimas</th>
        <th>Nuoroda</th>
        <th>Aprašymas</th>
        <th>Veiksmai</th>
      </tr>
      </thead>
      <tbody>
      {videos.length ? videos.map(renderVideo) : (
        <tr>
          <td colSpan={4}>
            Nepasirinkta video
          </td>
        </tr>
        )}
      </tbody>
    </Table>
  );
};

export default VideosTable;