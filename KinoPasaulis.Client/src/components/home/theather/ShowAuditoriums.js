import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button, Popover, ButtonToolbar, OverlayTrigger } from 'react-bootstrap';
import { getAuditoriums } from '../../../actions/theather/auditoriumActions';

class ShowAuditoriums extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {
          this.props.auditoriums.map((group, index) => (
            <h1> sdfsdfsdf </h1>
          ))
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(ShowAuditoriums);