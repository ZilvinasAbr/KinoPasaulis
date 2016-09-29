import React from 'react';
import { connect } from 'react-redux';

class TheatherComponent extends React.Component {
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
    return{
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TheatherComponent);