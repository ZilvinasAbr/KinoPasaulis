import React from 'react';
import { connect } from 'react-redux';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() { 
    return (
      <div>
        HomePage
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);