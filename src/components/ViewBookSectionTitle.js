import React from 'react'
import '../styles/viewBookTitle.css';
const ViewBookSectionTitle = ({title}) => {
    return (
        <section className="wrapper-global view-book-title">
            <h2 className="font-poppin">{title}</h2>
            <hr />
        </section>
    )
}

export default ViewBookSectionTitle
