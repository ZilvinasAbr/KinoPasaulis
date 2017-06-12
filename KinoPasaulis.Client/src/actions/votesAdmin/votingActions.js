import { push } from 'react-router-redux';
import request from 'superagent';

export function addVoting
(
  title,
  startDate,
  endDate,
  movieCreators
) {
  return dispatch => {
      request.post('/api/voting/addVoting')
        .send({
          title,
          startDate,
          endDate,
          movieCreators
        })
        .end((err, res) => {
          if(err) {
            console.error(err);
            return;
          }
          if(res.body) {
            dispatch(push('/votesAdmin/votings'));
          }else {
            console.error('unsuccessful addVoting');
          }
        });
  };
}
