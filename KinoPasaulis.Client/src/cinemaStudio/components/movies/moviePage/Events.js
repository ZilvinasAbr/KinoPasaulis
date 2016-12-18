import React from 'react';
import moment from 'moment';
import { Table } from 'react-bootstrap';

const renderEventRow = (event, index) => (
  <tr key={index}>
    <td>{event.theather.title}</td>
    <td>{moment(event.startTime).format('YYYY-MM-DD HH:MM')}</td>
    <td>{moment(event.endTime).format('YYYY-MM-DD HH:MM')}</td>
  </tr>
);

const Events = ({events}) => (
  <Table striped bordered condensed hover>
    <thead>
    <tr>
      <td>Kino teatro pavadinimas</td>
      <td>Rodymo pradžia</td>
      <td>Rodymo pabaiga</td>
    </tr>
    </thead>
    <tbody>
    {events.length > 0 ?
      events.map(renderEventRow) :
      (
        <tr>
          <td colSpan={3}>Šis filmas seniau nebuvo niekur rodomas</td>
        </tr>
      )
    }
    </tbody>
  </Table>
);

export default Events;