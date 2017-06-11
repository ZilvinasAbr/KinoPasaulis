import React from 'react';
import VotesAdminNavigationBar from '../VotesAdminNavigationBar';
import AddVotingForm from './AddVotingForm'

const AddVotingPage = ({}) => {
  return (
    <div>
      <VotesAdminNavigationBar />
      <div className="container">
        <h1> Naujo balsavimo sukūrimas </h1>
        <div>
          <div className="container col-md-4 col-md-offset-4">
            <h1> Sukurti balsavimą</h1>
            <hr />
            <AddVotingForm />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddVotingPage;