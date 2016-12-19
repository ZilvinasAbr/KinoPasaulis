import React from 'react';
import { Table } from 'react-bootstrap';

import SelectedImageFile from './SelectedImageFile';

const SelectedImagesPreviewTable = ({
  droppedFiles,
  removeDroppedImage,
  onImageTitleChange,
  onImageDescriptionChange,
  titles,
  descriptions
}) => (
  <Table striped bordered condensed hover>
    <thead>
    <tr>
      <th>Peržiūra</th>
      <th>Pavadinimas</th>
      <th>Aprašymas</th>
      <th>Veiksmai</th>
    </tr>
    </thead>
    <tbody>
    {droppedFiles.length > 0 ?
    droppedFiles.map((file, index) => (
      <SelectedImageFile
        key={index}
        index={index}
        file={file}
        onTitleChange={onImageTitleChange}
        onDescriptionChange={onImageDescriptionChange}
        removeDroppedImage={removeDroppedImage}
        title={titles[index]}
        description={descriptions[index]}
      />
    )) :
    <tr>
      <td colSpan={4}>Nepasirinkta nuotraukų</td>
    </tr>}
    </tbody>
  </Table>
);

export default SelectedImagesPreviewTable;