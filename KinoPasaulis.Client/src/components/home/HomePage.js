import React from 'react';
import { connect } from 'react-redux';
import TheatherHomePage from './TheatherHomePage';
import CinemaStudioHomePage from './CinemaStudioHomePage';
import { fetchUserData } from '../../actions/home/actions';
import axios from 'axios';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios.post('/api/account/login', {
      // UserName: 'KinoStudija1',
      UserName: 'KinoTeatras1',
      Password: 'testas'
    })
      .then(response => {
        if(response.data === true) {
          this.props.dispatch(fetchUserData());
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    if(this.props.userData === undefined) {
      return <div>Loading...</div>
    }
    switch(this.props.userData.role) {
      case 'Theather':
        return <TheatherHomePage />;
      case 'CinemaStudio':
        return <CinemaStudioHomePage />
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