import axios from 'axios';
import
{
  requestUserData,
  receiveUserData
} from '../../actionCreators/homePageActionCreators';

export function fetchUserData() {
  return dispatch => {
    dispatch(requestUserData());

    axios.get('/api/account/userData')
      .then(response => {
        dispatch(receiveUserData(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  }
}