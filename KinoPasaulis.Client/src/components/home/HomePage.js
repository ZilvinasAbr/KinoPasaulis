import React from 'react';
import { connect } from 'react-redux';
import TheatherHomePage from './TheatherHomePage';
import CinemaStudioHomePage from './CinemaStudioHomePage';
import MovieCreatorHomePage from './MovieCreatorHomePage';
import ClientHomePage from './ClientHomePage';
import { fetchUserData } from '../../actions/home/actions';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchUserData());
  }

  render() {
    if(this.props.userData === undefined) {
      return <div>Loading...</div>
    }
    switch(this.props.userData.role) {
      case 'Theather':
        return <TheatherHomePage />;
      case 'CinemaStudio':
        return <CinemaStudioHomePage />;
      case 'MovieCreator':
        return <MovieCreatorHomePage />;
      case 'Client':
        return <ClientHomePage />;
      default:
        return <div>Error</div>;
    }
  }
}

function mapStateToProps(state) {
  return {
    userData: state.homePage.userData
  }
}

export default connect(mapStateToProps)(HomePage);