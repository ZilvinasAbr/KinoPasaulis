import React from 'react';

const Main = ({changeViewToUser, changeViewToTheater, changeViewToCinemaStudio}) => {
  return (
    <div className="container">
      <div className="row">
        <button type="button" className="btn btn-primary" onClick={changeViewToUser}>Vartotojo registracija</button>
        <button type="button" className="btn btn-primary" onClick={changeViewToTheater}>Kino teatro registracija</button>
        <button type="button" className="btn btn-primary" onClick={changeViewToCinemaStudio}>Kino studijos registracija</button>
      </div>
    </div>
  );
};

Main.propTypes = {
  changeViewToUser: React.PropTypes.func.isRequired,
  changeViewToTheater: React.PropTypes.func.isRequired,
  changeViewToCinemaStudio: React.PropTypes.func.isRequired
};

export default Main;