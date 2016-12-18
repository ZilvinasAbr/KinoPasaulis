import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import MovieCreatorNavigationBar from './MovieCreatorNavigationBar';
import { Button, Popover, ButtonToolbar, OverlayTrigger, Col, Table, Modal, Checkbox, FormControl, Thumbnail } from 'react-bootstrap';

class JobOffersPage extends React.Component {
    constructor(props) {
        super(props);
        this.state =
        {
            jobOffers: []
        }
    }

    componentDidMount() {

        axios.get('/api/moviecreator/getJobs')
            .then(response => {
                this.setState({
                    jobOffers: response.data
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    renderJobAdvertisements() {
        let jobOffers = this.state.jobOffers;
        if(jobOffers.length <= 0) {
            return (
                <tr>
                    <td colSpan={7}>
                        Nėra darbo skelbimų
                    </td>
                </tr>
            );
        }

        return jobOffers.map((jobOffer, index) => (
            <tr key={index}>
                <td>{index+1}</td>
                <td>{jobOffer.movie.title}</td>
                <td>{jobOffer.specialty.title}</td>
                <td>{jobOffer.title}</td>
                <td>{jobOffer.duration} dienų</td>
                <td>{jobOffer.payRate}</td>
                <td>
                    <Button>
                        Parašyti kino studijai
                    </Button>
                </td>
            </tr>
        ));
    }

    render() {
        return (
            <div>
                <MovieCreatorNavigationBar />
                <Col xs={8} xsOffset={2} sm={6} smOffset={3} lg={4} lgOffset={4}>
                    <h1>Darbo skelbimai</h1>
                    <hr />
                </Col>
                <Col xs={10} xsOffset={1} sm={10} smOffset={1} lg={6} lgOffset={3}>
                    <div>
                        <p>Minimalus atlygis</p>
                        <select>
                            <option value="1000">1000</option>
                            <option value="5000">5000</option>
                            <option value="10000">10000</option>
                            <option value="50000">50000</option>
                            <option value="100000">100000</option>
                        </select>
                    </div>
                </Col>
                <Col xs={10} xsOffset={1} sm={10} smOffset={1} lg={6} lgOffset={3}>
                    <Table striped bordered condensed hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Filmo pavadinimas</th>
                            <th>Ieškoma pareiga</th>
                            <th>Antraštė</th>
                            <th>Sutarties trukmė</th>
                            <th>Atlygis</th>
                            <th>Veiksmai</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderJobAdvertisements()}
                        </tbody>
                    </Table>
                </Col>
            </div>);
    }
}

function mapStateToProps(state) {
    return {
        userData: state.homePage.userData
    }
}

export default connect(mapStateToProps)(JobOffersPage);