import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import TheatherNavigationBar from '../TheatherNavigationBar';
import AddAuditoriumForm from '../AddAuditoriumForm';
import { Button, Popover, ButtonToolbar, OverlayTrigger, Col, Table } from 'react-bootstrap';
import { getAuditoriums } from '../../../../actions/theather/auditoriumActions';

class Auditoriums extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAuditoriums();
  }

  renderAuditoriums() {
    let auditoriums = this.props.auditoriums;

    return auditoriums.map((a, index) => {
      return <tr key={index}><td>{a.name} </td> <td> {a.seats} </td> <td><Button bsStyle="danger"> <span className="glyphicon glyphicon-remove"></span> </Button> <Button> <span className="glyphicon glyphicon-pencil"></span> </Button></td></tr>
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
        <Col md={3}>
          <div className="container">
            <h1> Auditoriums </h1>
            <ButtonToolbar>
              <OverlayTrigger trigger="click" rootClose placement="right" overlay={addNewForm}>
                <Button>Nauja</Button>
              </OverlayTrigger>
            </ButtonToolbar>
          </div>
        </Col>
        <Col md={9}>
          <div className="container">
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Seats</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.renderAuditoriums()}
              </tbody>
            </Table>
          </div>
        </Col>
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