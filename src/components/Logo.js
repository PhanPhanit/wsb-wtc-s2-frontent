import React from 'react'
import {Link} from 'react-router-dom';
import '../styles/logo.css';

const Logo = () => {
  return (
    <div className="general-logo">
        <Link to="/">
            <font>W</font>
            <font>s</font>
            <font>book</font>
        </Link>
    </div>
  )
}

export default Logo