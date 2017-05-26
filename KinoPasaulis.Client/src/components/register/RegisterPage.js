import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import LoggedOfNavigationBar from '../common/LoggedOfNavigationBar';
import { Button } from 'react-bootstrap';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <LoggedOfNavigationBar changePageToLanding={this.props.changePageToLanding} changePageToLogin={this.props.changePageToLogin} changePageToRegister={this.props.changePageToRegister} />
        <div className="container">
          <div className="row">
            <Button bsStyle="primary" onClick={this.props.changePageToClient} block>Kliento registracija</Button>
            <Button bsStyle="primary" onClick={this.props.changePageToTheather} block>Kino teatro registracija</Button>
            <Button bsStyle="primary" onClick={this.props.changePageToCinemaStudio} block>Kino studijos registracija</Button>
            <Button bsStyle="primary" onClick={this.props.changePageToMovieCreator} block>Kino kūrėjo registracija</Button>
            <Button bsStyle="primary" onClick={this.props.changePageToVotesAdmin} block>Balsavimų administratoriaus registracija</Button>
          </div>
        </div>
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
    changePageToLanding: () => {
      dispatch(push('/'));
    },
    changePageToLogin: () => {
      dispatch(push('/login'));
    },
    changePageToRegister: () => {
      dispatch(push('/register'));
    },
    changePageToCinemaStudio: () => {
      dispatch(push('/register/cinemastudio'));
    },
    changePageToTheather: () => {
      dispatch(push('/register/theather'));
    },
    changePageToMovieCreator: () => {
      dispatch(push('/register/moviecreator'));
    },
    changePageToVotesAdmin: () => {
      dispatch(push('/register/votesadmin'));
    },
    changePageToClient: () => {
      dispatch(push('/register/client'));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);