import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Well, Col } from 'react-bootstrap';
import { getSubscriptions } from '../../actions/client/subscriptionActions';
import { getTheathers } from '../../actions/theather/theatherActions';
import ClientNavigationBar from './client/ClientNavigationBar';

class ClientHomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getSubscriptions();
    this.props.getTheathers();
  }

  renderSubscriptions() {
    let subscriptions = this.props.subscriptions;
    return subscriptions.map((subscription, index) => {
      return <div key={index}>
        <Col md={4}>
          <Well>
            <h2> {subscription.title} </h2>
            <a className="btn btn-primary"> Plačiau </a>
          </Well>
        </Col>
      </div>
    });
  }

  renderTheathers() {
    let theathers = this.props.theathers;
    return theathers.map((theather, index) => {
      return <div key={index}>
        <Col md={4}>
          <Well>
            <h2> {theather.title} </h2>
            <a className="btn btn-primary"> Plačiau </a>
          </Well>
        </Col>
      </div>
    });
  }

  render() {
    return (
      <div>
        <ClientNavigationBar />
        <h1> Pagrindinis puslapis </h1>

        <div className="container">
          <Col md={9}>
            <h2> Prenumeruotų teatrų sąrašas </h2>
            {this.renderSubscriptions()}
          </Col>
        </div>

        <div className="container">
          <Col md={9}>
            <h2> Visų teatrų sąrašas </h2>
            {this.renderTheathers()}
          </Col>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    subscriptions: state.clientPage.subscriptions || [],
    theathers: state.theaterPage.theathers || [],
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getSubscriptions: () => {
      dispatch(getSubscriptions());
    },
    getTheathers: () => {
      dispatch(getTheathers());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientHomePage);