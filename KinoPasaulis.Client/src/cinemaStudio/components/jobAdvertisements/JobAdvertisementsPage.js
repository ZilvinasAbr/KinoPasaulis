import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button } from 'react-bootstrap';

import CinemaStudioNavigationBar from '../CinemaStudioNavigationBar';

class JobAdvertisementsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <CinemaStudioNavigationBar />
        <div>
          <Button
            bsStyle="primary"
            onClick={() => this.props.dispatch(
              push('/cinemaStudio/addJobAdvertisement')
            )}
          >
            Pridėti darbo skelbimą
          </Button>
        </div>
      </div>
    )
  }
}

export default connect()(JobAdvertisementsPage);