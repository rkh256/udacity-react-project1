import React from 'react';
import { Link } from 'react-router-dom';

const RouteNotFound = ({ location }) => (
  <div className='container'>
    <h1>Page Not Found <code>{location.pathname}</code></h1>
    <hr/>
    <p>
      <Link to='/'>Go back to the Home Page</Link>
    </p>
  </div>
)

export default RouteNotFound;
