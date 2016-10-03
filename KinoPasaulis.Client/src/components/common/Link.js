import React from 'react';

const Link = (props) => {
  return (
    <a href="javascript:void(0)" onClick={props.onClick}>{props.children}</a>
  )
};

Link.propTypes = {
  onClick: React.PropTypes.func.isRequired
};

export default Link;