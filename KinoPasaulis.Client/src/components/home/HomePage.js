import React from 'react';
import { connect } from 'react-redux';
import TheatherNavigationBar from '../register/theather/TheatherNavigationBar';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() { 
    return (
      <div>
        <TheatherNavigationBar
          changePageToLanding={this.props.changePageToLanding}/>
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