import React from 'react';

import CinemaStudioNavigationBar from '../../CinemaStudioNavigationBar';
import AddJobAdvertisementForm from './AddJobAdvertisementForm';

class AddJobAdvertisementPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <CinemaStudioNavigationBar />
        <div>
          <div className="container col-md-4 col-md-offset-4">
            <h1>Pridėti darbo skelbimą</h1>
            <hr />
            <AddJobAdvertisementForm />
          </div>
        </div>
      </div>
    )
  }
}

export default AddJobAdvertisementPage;