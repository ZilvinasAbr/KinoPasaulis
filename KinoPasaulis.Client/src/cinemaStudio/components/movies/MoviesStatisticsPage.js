import React from 'react';
import { connect } from 'react-redux';
import { Col, Table } from 'react-bootstrap';

import CinemaStudioNavigationBar from '../CinemaStudioNavigationBar';
import { fetchCinemaStudiosMoviesStatistics } from '../../actions/cinemaStudiosStatistics';

class MoviesStatisticsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sortByColumnName: 'title',
      isAscending: true
    };

    this.renderMovies = this.renderMovies.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchCinemaStudiosMoviesStatistics());
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

  renderMovie(movie, index) {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{movie.title}</td>
        <td>{movie.eventsCount}</td>
        <td>{movie.rating ?
          movie.rating.toFixed(2) : 'filmas nėra įvertintas'}
        </td>
      </tr>
    );
  }

  renderMovies(movies) {
    if(movies.length <= 0) {
      return (
        <tr>
          <td colSpan={4}>
            Nėra filmų
          </td>
        </tr>
      );
    }

    let sorted = movies.concat().sort((x, y) => {
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

    return sorted.map(this.renderMovie);
  }

  render() {
    return (
      <div>
        <CinemaStudioNavigationBar />
        <Col xs={8} xsOffset={2} sm={6} smOffset={3} lg={4} lgOffset={4}>
          <h1>Kino filmų ataskaita</h1>
          <hr />
        </Col>
        <Col xs={10} xsOffset={1} sm={10} smOffset={1} lg={6} lgOffset={3}>
          <Table striped bordered condensed hover>
            <thead>
            <tr>
              <th>#</th>
              <th onClick={() => this.handleColumnClick('title')}>Pavadinimas</th>
              <th onClick={() => this.handleColumnClick('eventsCount')}>Kiek kino teatrų rodo šį filmą</th>
              <th onClick={() => this.handleColumnClick('rating')}>Reitingas</th>
            </tr>
            </thead>
            <tbody>
            {this.renderMovies(this.props.moviesStatistics)}
            </tbody>
          </Table>
        </Col>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    moviesStatistics: state.cinemaStudioPage.moviesStatistics
  }
}

export default connect(mapStateToProps)(MoviesStatisticsPage);