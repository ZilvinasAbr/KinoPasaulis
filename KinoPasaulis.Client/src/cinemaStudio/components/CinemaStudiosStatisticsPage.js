import React from 'react';
import { connect } from 'react-redux';
import { Col, Table } from 'react-bootstrap';

import CinemaStudioNavigationBar from './CinemaStudioNavigationBar';
import { fetchCinemaStudioStatistics } from '../actions/cinemaStudiosStatistics';

class CinemaStudiosStatisticsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sortByColumnName: 'name',
      isAscending: true
    };

    this.renderCinemaStudios = this.renderCinemaStudios.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchCinemaStudioStatistics());
  }

  handleColumnClick(columnName) {
    if(this.state.sortByColumnName === columnName) {
      this.setState({
        isAscending: !this.state.isAscending
      })
    }else {
      this.setState({
        sortByColumnName: columnName,
        isAscending: true
      });
    }
  }

  renderCinemaStudio(cinemaStudio, index) {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{cinemaStudio.name}</td>
        <td>{cinemaStudio.sumOfAllMovieEvents}</td>
        <td>{cinemaStudio.moviesCount}</td>
        <td>{cinemaStudio.averageMovieRating ?
          cinemaStudio.averageMovieRating.toFixed(2) : 'nėra filmų su reitingu'}
        </td>
        <td>{cinemaStudio.bestMovieRating ?
          cinemaStudio.bestMovieRating.toFixed(2) : 'nėra filmų su reitingu'}
        </td>
      </tr>
    );
  }

  renderCinemaStudios(cinemaStudios) {
    if(cinemaStudios.length <= 0) {
      return (
        <tr>
          <td colSpan={4}>
            Nėra kino studijų
          </td>
        </tr>
      );
    }

    let sorted = cinemaStudios.concat().sort((x, y) => {
      if(x[this.state.sortByColumnName] < y[this.state.sortByColumnName]) {
        return -1;
      }else if(x[this.state.sortByColumnName] > y[this.state.sortByColumnName]) {
        return 1;
      }
      return 0;
    });

    if(!this.state.isAscending) {
      sorted.reverse();
    }

    return sorted.map(this.renderCinemaStudio);
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
              <th>#</th>
              <th onClick={() => this.handleColumnClick('name')}>Kino Studija</th>
              <th onClick={() => this.handleColumnClick('sumOfAllMovieEvents')}>Visų filmų rodymo šiuo metu kiekis</th>
              <th onClick={() => this.handleColumnClick('moviesCount')}>Išleistų filmų kiekis</th>
              <th onClick={() => this.handleColumnClick('averageMovieRating')}>Vidutinis kino studijos filmo reitingas</th>
              <th onClick={() => this.handleColumnClick('bestMovieRating')}>Geriausio kino studijos filmo reitingas</th>
            </tr>
            </thead>
            <tbody>
            {this.renderCinemaStudios(this.props.cinemaStudios)}
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