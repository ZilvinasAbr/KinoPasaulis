import React from 'react';
import { connect } from 'react-redux';
import { Col, Table } from 'react-bootstrap';

import CinemaStudioNavigationBar from './CinemaStudioNavigationBar';
import { fetchCinemaStudioStatistics } from '../actions/cinemaStudiosStatistics';

class CinemaStudiosStatisticsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchCinemaStudioStatistics());
  }

  renderCinemaStudio(cinemaStudio, index) {
    return (
      <tr key={index}>
        <td>{cinemaStudio.name}</td>
        <td>{cinemaStudio.moviesCount}</td>
        <td>{cinemaStudio.averageMovieRating.toFixed(2)}</td>
        <td>{cinemaStudio.bestMovieRating.toFixed(2)}</td>
      </tr>
    );
  }

  render() {
    return (
      <div>
        <CinemaStudioNavigationBar />
        <Col xs={8} xsOffset={2} sm={6} smOffset={3} lg={4} lgOffset={4}>
          <h1>Kino studijų statistika</h1>
        </Col>
        <Col xs={10} xsOffset={1} sm={10} smOffset={1} lg={6} lgOffset={3}>
          <Table striped bordered condensed hover>
            <thead>
            <tr>
              <th>Kino Studija</th>
              <th>Išleistų filmų kiekis</th>
              <th>Vidutinis kino studijos filmo reitingas</th>
              <th>Geriausio kino studijos filmo reitingas</th>
            </tr>
            </thead>
            <tbody>
            {this.props.cinemaStudios.length ? this.props.cinemaStudios.map(this.renderCinemaStudio) : (
                <tr>
                  <td colSpan={2}>
                    Nėra kino studijų
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </div>
    );
  }
}

CinemaStudiosStatisticsPage.propTypes = {
  cinemaStudios: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};

function mapStateToProps(state) {
  return {
    cinemaStudios: state.cinemaStudioPage.cinemaStudiosStatistics
  }
}

export default connect(mapStateToProps)(CinemaStudiosStatisticsPage);