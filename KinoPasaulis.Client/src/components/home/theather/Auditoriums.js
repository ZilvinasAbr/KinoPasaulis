import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import TheatherNavigationBar from './TheatherNavigationBar';
import { Button, Form, FormGroup, Col, FormControl, ControlLabel, Popover, ButtonToolbar, OverlayTrigger } from 'react-bootstrap';

class Auditoriums extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <TheatherNavigationBar
          changePageToLanding={this.props.changePageToLanding}
          goToAuditoriums={this.props.goToAuditoriums}
          goToEvents={this.props.goToEvents}
          goToSubscriptions={this.props.goToSubscriptions}
          logOut={this.props.logOut}
        />

        <div className="container">
          <h1> Auditoriums </h1>
          <ButtonToolbar>
            <OverlayTrigger trigger="click" rootClose placement="right" overlay={addNewForm}>
              <Button>Nauja</Button>
            </OverlayTrigger>
          </ButtonToolbar>
        </div>
      </div>
    );
  }
}

const addNewForm = (
  <Popover id="popover-positioned-left" title="Prideti nauja auditorija">
    <FormControl type="text" placeholder="Auditorijos pavadinimas" />

    <FormControl type="number" placeholder="Vietu skaicius" />

    <Button> Patvirtinti </Button>
  </Popover>
);

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changePageToLanding: () => {
      dispatch(push('/'));
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

    logOut: () => {
      dispatch(push('/theather/logout'));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auditoriums);