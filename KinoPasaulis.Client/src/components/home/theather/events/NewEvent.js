import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import TheatherNavigationBar from '../TheatherNavigationBar';
import AddEventForm from './AddEventForm';
import { logout } from '../../../../actions/account/logoutActions';
import { getAuditoriums } from '../../../../actions/theather/auditoriumActions';
import { fetchMovies } from '../../../../cinemaStudio/actions/movieActions';

class NewEvent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAuditoriums();
    this.props.getMovies();
  }

  render() {
    return (
      <div>
        <TheatherNavigationBar
          changePageToHome={this.props.changePageToHome}
          goToAuditoriums={this.props.goToAuditoriums}
          goToEvents={this.props.goToEvents}
          goToSubscriptions={this.props.goToSubscriptions}
          logout={this.props.logout}
        />
        <div className="container">
          <h1> New event form </h1>
          <AddEventForm
            auditoriums={this.props.auditoriums}
            movies={this.props.movies}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auditoriums: state.theaterPage.auditoriums || [],
    movies: state.cinemaStudioPage.movies || []
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changePageToHome: () => {
      dispatch(push('/home'));
    },

    goToAuditoriums: () => {
      dispatch(push('/theather/auditoriums'));
    },

    goToEvents: () => {
      dispatch(push('/theather/events'));
    },

    goToSubscriptions: () => {
      dispatch(push('/theather/subscriptions'));
    },

    logout: () => {
      dispatch(logout());
    },

    getAuditoriums: () => {
      dispatch(getAuditoriums());
    },

    goToEventCreateForm: () => {
      dispatch(push('/theather/newEvent'));
    },

    getMovies: () => {
      dispatch(fetchMovies());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewEvent);