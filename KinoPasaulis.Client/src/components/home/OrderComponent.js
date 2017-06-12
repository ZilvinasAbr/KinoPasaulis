import React from 'react';
import { Well, Button, Col} from 'react-bootstrap';
import moment from 'moment';

class OrderComponent extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      inputValue: '1'
    };
  }

  handleInputValueChange(e) {
    this.setState({
      inputValue: e.target.value
    });
  }

  getOrdersCount(order) {
    let seatsOrdered = 0;
    for(let i = 0; i<order.length; i++) {
      seatsOrdered += order[i].amount;
    }
    return seatsOrdered;
  }

  renderOrderButton(show) {
    if(show.auditorium.seats <= this.getOrdersCount(show.orders)) {
      return (
        <div>
        <p> Bilietų kiekis: <input type="number" name="amount" value={this.state.inputValue} readOnly/></p>
        <Button bsStyle="primary" onClick={() => this.props.addOrder(show.id, this.state.inputValue)} disabled> Užsisakyti </Button>
        </div>
      );
    }else {
      return (
        <div>
        <p> Bilietų kiekis: <input type="number" name="amount" min="1" max={show.auditorium.seats - this.getOrdersCount(show.orders)} value={this.state.inputValue} onChange={(e) => this.handleInputValueChange(e)}/></p>
        <Button bsStyle="primary" onClick={() => this.props.addOrder(show.id, this.state.inputValue)}> Užsisakyti </Button>
        </div>
      );
    }
  }

  render() {
    const {show, index} = this.props;

    var now = new Date();
    if(moment(show.startTime).format('YYYY/MM/DD HH:MM') < moment(now).format('YYYY/MM/DD HH:mm'))
    {
      return null;
    }

    return (
      <div key={index}>
        <Col md={4}>
          <Well>
            <p> Auditorijos pavadinimas: {show.auditorium.name} </p>
            <p> Vietų skaičius: {show.auditorium.seats} </p>
            <p> Užimta vietų: {this.getOrdersCount(show.orders)}</p>
            <p> Seanso pradžia: {moment(show.startTime).format('YYYY/MM/DD HH:mm')}</p>
            {this.renderOrderButton(show)}
          </Well>
        </Col>
      </div>
    );
  }
}

OrderComponent.propTypes = {
  addOrder: React.PropTypes.func.isRequired,
  show: React.PropTypes.object.isRequired,
  index: React.PropTypes.number.isRequired
};

export default OrderComponent;