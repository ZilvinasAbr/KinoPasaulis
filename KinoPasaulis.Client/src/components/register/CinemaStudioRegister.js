import React from 'react';

const CinemaStudioRegister = (props) => {
  return (
    <div className="container">
      <h1>Kino studijos registracija</h1>
      <hr />
      <div className="row">
        <div className="form-group">
          <input type="text" placeholder="Elektroninis paštas" className="form-control" name="Email" />
        </div>
        <div className="form-group">
          <input type="password" placeholder="Slaptažodis" className="form-control" name="Password" />
        </div>
        <div className="form-group">
          <input type="password" placeholder="Pakartoti slaptažodį" className="form-control" name="Repeat" />
        </div>
        <button type="submit" className="btn btn-primary">Registruotis</button>
      </div>
    </div>
  );
};

export default CinemaStudioRegister;