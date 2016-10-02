import React from 'react';
import { connect } from 'react-redux';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        LoginPage
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);