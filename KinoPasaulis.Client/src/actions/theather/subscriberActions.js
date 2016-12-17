import axios from 'axios';
import { push } from 'react-router-redux';
import {
    receiveSubscribers as receiveTheaterSubscribers,
    requestSubscribers
} from '../../actionCreators/theaterActionCreators';

export function receiveSubscribers() {
    return dispatch => {

        dispatch(requestSubscribers());

        return axios.get('/api/announcement/subscribers')
            .then(response => {
                dispatch(receiveTheaterSubscribers(response.data));
            })
            .catch(error => {
                console.log(error);
            })
    }
}
