import React from 'react';
import { connect } from 'react-redux';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        RegisterPage
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);