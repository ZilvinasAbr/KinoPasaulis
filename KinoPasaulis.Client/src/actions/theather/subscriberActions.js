import axios from 'axios';
import { push } from 'react-router-redux';
import {
    receiveSubscribers as receiveTheaterSubscribers,
    requestSubscribers,
    sendAnnouncement as sendAnnouncementToUser
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

export function sendAnnouncement(subscribers, message) {

      return axios.post('/api/announcement', {
        ClientIds: subscribers,
        Message: message
      })
        .then(response => {
            if(response.status = 200)
            {
              alert('Operacija sėkminga')
            }
        })
        .catch(error => {
          alert('Operacija nesėkminga')
          console.log(error);
        })
}
