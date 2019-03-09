import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="ui secondary pointing menu" style={{ textAlign: 'center', padding: '30px' }}>
      <Link to="/">
        <h1>Posturme</h1>
      </Link>
    </div>
  )
};

export default Header;
