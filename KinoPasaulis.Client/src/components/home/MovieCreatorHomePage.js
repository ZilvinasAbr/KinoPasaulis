import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import MovieCreatorNavigationBar from './movieCreator/MovieCreatorNavigationBar';

class MovieCreatorHomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <MovieCreatorNavigationBar
            changePageToHome={this.props.changePageToHome}
            goToTaggedMovies={this.props.goToTaggedMovies}
            changePageToProfile={this.props.changePageToProfile}
            logout={this.props.logout}/>
        <h1> Movie Creator Home Page </h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changePageToHome: () => {
      dispatch(push('/home'));
    },
    goToTaggedMovies: () => {
      dispatch(push('/moviecreator/taggedMovies'));
    },
    logout: () => {
      dispatch(logout());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieCreatorHomePage);