import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
  }



  renderNavigationBar() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Kino Pasaulis</a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav navbar-right">
              <li><a href="javascript:void(0)" onClick={this.props.changePageToLogin}>Prisijungti</a></li>
              <li><a href="javascript:void(0)" onClick={this.props.changePageToRegister}>Registruotis</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }

  render() {
    return (
      <div>
        {this.renderNavigationBar()}
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
    changePageToLogin: () => {
      dispatch(push('login'));
    },

    changePageToRegister: () => {
      dispatch(push('register'));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);