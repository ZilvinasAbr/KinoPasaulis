import React from 'react';
import CinemaStudioNavigationBar from './cinemaStudio/CinemaStudioNavigationBar';

class CinemaStudioHomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <CinemaStudioNavigationBar />
        <h1> Cinema Studio Home Page </h1>
      </div>
    );
  }
}

export default CinemaStudioHomePage;