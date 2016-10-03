import React from 'react';
import Link from './Link';

const LoggedOfNavigationBar = ({changePageToLanding, changePageToLogin, changePageToRegister}) => {
  return (
    <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <a className="navbar-brand" href="#">Kino Pasaulis</a>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav navbar-right">
            <li><Link onClick={changePageToLogin}>Prisijungti</Link></li>
            <li><Link onClick={changePageToRegister}>Registruotis</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  )
};

LoggedOfNavigationBar.propTypes = {
  changePageToLanding: React.PropTypes.func.isRequired,
  changePageToLogin: React.PropTypes.func.isRequired,
  changePageToRegister: React.PropTypes.func.isRequired
};

export default LoggedOfNavigationBar;