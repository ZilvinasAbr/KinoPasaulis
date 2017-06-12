import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import axios from 'axios';
import { Table, Col } from 'react-bootstrap';
import moment from 'moment';

import NavigationBar from '../../../components/common/NavigationBar';

class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    };
  }

  componentDidMount() {
    axios.get('/api/client/getOrders')
      .then(response => {
        this.setState(
          {
            orders: response.data
          });
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderOrders() {
    let orders = this.state.orders;
    return orders.map((order, index) => {
      return <tr key={index}>
        <td>{moment(order.orderDate).format('YYYY/MM/DD')}</td>
        <td><a href="javascript:void(0)" onClick={() => this.props.goToTheatherDetails(order.show.auditorium.theather.id)}>{order.show.auditorium.theather.title}</a></td>
        <td>{order.show.auditorium.name}</td>
        <td><a href="javascript:void(0)" onClick={() => this.props.goToMovieDetails(order.show.event.movie.id)}>{order.show.event.movie.title}</a></td>
        <td>{moment(order.show.startTime).format('YYYY/MM/DD HH:mm:ss')}</td>
        <td>{order.amount}</td>
        <td>{order.price} €</td>
      </tr>
    });
  }

  render() {
    return (
      <div>
        <NavigationBar/>
		<Col md={12}>
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <td>
                  Užsakymo data
                </td>
                <td>
                  Kino teatras
                </td>
                <td>
                  Salė
                </td>
                <td>
                  Filmas
                </td>
                <td>
                  Seanso pradžios data
                </td>
                <td>
                  Bilietų kiekis
                </td>
                <td>
                  Kaina
                </td>
              </tr>
            </thead>
            <tbody>
            {this.renderOrders()}
            </tbody>
          </Table>
		</Col>
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
    goToMovieDetails: (id) => {
      dispatch(push('/movie/'+id))
    },
    goToTheatherDetails: (id) => {
      dispatch(push('/theathers/'+id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);