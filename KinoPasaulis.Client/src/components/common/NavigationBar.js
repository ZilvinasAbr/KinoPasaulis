import React from 'react';
import { connect } from 'react-redux';
import TheatherNavigationBar from '../home/theather/TheatherNavigationBar';
import CinemaStudiosNavigationBar from '../../cinemaStudio/components/CinemaStudioNavigationBar';
import MovieCreatorNavigationBar from '../home/movieCreator/MovieCreatorNavigationBar';
import ClientNavigationBar from '../home/client/ClientNavigationBar';
import VotesAdminNavigationBar from '../home/votesAdmin/VotesAdminNavigationBar';
import { fetchUserData } from '../../actions/home/actions';

class NavigationBar extends React.Component {
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
        return <TheatherNavigationBar />;
      case 'CinemaStudio':
        return <CinemaStudiosNavigationBar />;
      case 'MovieCreator':
        return <MovieCreatorNavigationBar />;
      case 'Client':
        return <ClientNavigationBar />;
      case 'VotesAdmin':
        return <VotesAdminNavigationBar />;
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

export default connect(mapStateToProps)(NavigationBar);