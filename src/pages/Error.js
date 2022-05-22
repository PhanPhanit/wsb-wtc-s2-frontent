import React from 'react'
import {Link} from 'react-router-dom';
import '../styles/error.css';

function Error() {
    return (
        <section id="error-page">
            <div className="not-found">
                <span>4</span>
                <span>0</span>
                <span>4</span>
            </div>
            <p>Page Not Found!</p>
            <Link to="/" className="btn-not-found">Back To Homepage</Link>
        </section>
    )
}

export default Error
