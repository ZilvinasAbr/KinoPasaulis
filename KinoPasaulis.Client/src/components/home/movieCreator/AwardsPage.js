import React from 'react';
import {connect} from 'react-redux';
import MovieCreatorNavigationBar from './MovieCreatorNavigationBar';
import {Button} from 'react-bootstrap';
import {Well, Col} from 'react-bootstrap';
import moment from 'moment';
import axios from 'axios';

class AwardsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      awards: []
    };
  }

  componentDidMount() {

    axios.get('/api/moviecreator/getAwards')
      .then(response => {
        this.setState({
          awards: response.data
        })
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderAwards() {
    let awards = this.state.awards;

    if (awards.length <= 0) {
      return (
        <table>
          <tbody>
          <tr>
            <td colSpan={7}>
              Nelaimėtas nei vienas balsavimas.
            </td>
          </tr>
          </tbody>
        </table>
      );
    }

    return awards.map((award, index) => {
      return <div key={index}>
        <Col md={4}>
          <Well>
            <h2> {award.title} </h2>
            <div>Laimėta:</div>
            {moment(award.endDate).format('YYYY-MM-DD HH:mm:ss')}
          </Well>
        </Col>
      </div>
    });
  }

  render() {
    return (
      <div>
        <MovieCreatorNavigationBar
        />
        <div className="container">
          <Col md={12}>
            <h2> Laimėti apdovanojimai </h2>
            {this.renderAwards()}
          </Col>
        </div>
      </div>
    );
  }
}

export default connect()(AwardsPage);