import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import TheatherNavigationBar from './TheatherNavigationBar';
import AddAuditoriumForm from './AddAuditoriumForm';
import { Button, Popover, ButtonToolbar, OverlayTrigger } from 'react-bootstrap';
import { getAuditoriums } from '../../../actions/theather/auditoriumActions';

class Auditoriums extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAuditoriums();
  }

  renderAuditoriums() {
    const auditoriums = this.props.auditoriums;

    return auditoriums.map((a, index) => {
      return <div key={index}>{a.id} {a.name} {a.seats}</div>
    });
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
        <div className="container">
          {this.renderAuditoriums()}
        </div>
      </div>
    );
  }
}

const addNewForm = (
  <Popover id="popover-positioned-left" title="Prideti nauja auditorija">
    <AddAuditoriumForm/>
  </Popover>
);

function mapStateToProps(state) {
  return {
    auditoriums: state.theaterPage.auditoriums || []
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
    },

    getAuditoriums: () => {
      dispatch(getAuditoriums());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auditoriums);