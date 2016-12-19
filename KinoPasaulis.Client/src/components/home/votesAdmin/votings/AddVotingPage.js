import React from 'react';
import VotesAdminNavigationBar from '../VotesAdminNavigationBar';
import AddVotingForm from './AddVotingForm'

/*const escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

 const getSuggestions = (value, movieCreators) => {
 const escapedValue = escapeRegexCharacters(value.trim());

 if (escapedValue === '') {
 return [];
 }

 const regex = new RegExp('^' + escapedValue, 'i');

 return movieCreators.filter(movieCreator => regex.test(movieCreator.firstName + " " + movieCreator.firstName));
 };

 const getSuggestionValue = suggestion => suggestion.firstName + " " + suggestion.firstName;

 const renderSuggestion = suggestion => (
 <span>{suggestion.firstName} {suggestion.lastName}</span>
 );*/

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